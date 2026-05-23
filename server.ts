import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env if present
dotenv.config();

// Determine database path and resolve it to an absolute URL to avoid issues under Cloud Run environment
let databaseUrl = process.env.DATABASE_URL || 'file:./dev.db';
if (databaseUrl.startsWith('file:')) {
  const relativePath = databaseUrl.replace(/^file:/, '');
  const absolutePath = path.resolve(process.cwd(), relativePath);
  databaseUrl = `file:${absolutePath}`;
}

process.env.DATABASE_URL = databaseUrl;
console.log(`[DATABASE] Active DATABASE_URL registered: ${process.env.DATABASE_URL}`);

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-prod';

// Global Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for Vite dev/preview and React
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Prevents loading external resources smoothly
  frameguard: false,                // Allow rendering inside iframes for AI Studio preview environment
}));
app.use(cors({ origin: true, credentials: true })); // Allow proper CORS matching with credentials
app.use(express.json({ limit: '10mb' })); // Protect against large payload DDOS
app.use(cookieParser());

// Debugging Request Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`🔍 [INCOMING REQUEST] ${req.method} ${req.originalUrl} | IP: ${req.ip}`);
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(` ✅ [RESPONSE] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, 
  legacyHeaders: false, 
  message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies.admin_token;

  if (token == null) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Zod schemas
const loginSchema = z.object({
  email: z.string().email().optional().default('admin@kaivon.os'),
  password: z.string().min(8)
});

const projectSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  tags: z.string().optional().default(''),
  category: z.string().min(2),
  year: z.string().min(4),
  status: z.string().optional().default('DRAFT')
});

// Seed initial admin user if not exists
async function seedAdmin() {
  const adminCount = await prisma.user.count();
  if (adminCount === 0) {
    const hashedPassword = await bcrypt.hash('KaivonRhianRhz1599$', 12);
    await prisma.user.create({
      data: {
        email: 'admin@kaivon.os',
        password: hashedPassword,
        role: 'ADMIN',
      }
    });
    console.log('Seeded initial admin user.');
  }
}
seedAdmin().catch(console.error);

// API Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { password, email } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
    
    // Set HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    res.json({ success: true, email: user.email });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input data', details: err.issues });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true });
});

app.get('/api/auth/me', authenticateToken, async (req: any, res) => {
  res.json({ user: req.user });
});

// Projects API
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const body = projectSchema.parse(req.body);
    const project = await prisma.project.create({
      data: body
    });
    res.status(201).json(project);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input data', details: err.issues });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Vite Integration
async function startServer() {
  console.log(`[BOOT] Initializing server. NODE_ENV: "${process.env.NODE_ENV}"`);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('[BOOT] Setting up Vite dev server with middleware mode...');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    console.log('[BOOT] Vite dev server created successfully. Attaching middlewares...');
    app.use(vite.middlewares);

    // Servir o index.html dinamicamente em desenvolvimento
    app.get('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        console.log(`[ROUTE MATCH] Api request bypassed to router: ${url}`);
        return next();
      }

      console.log(`[ROUTE MATCH] Handling fallback html routing for: "${url}"`);
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        console.log(`[VITE SERVE] Reading base template from path: ${indexPath}`);
        let template = fs.readFileSync(indexPath, 'utf-8');
        
        console.log(`[VITE SERVE] Transforming index.html via Vite transformIndexHtml for: "${url}"`);
        template = await vite.transformIndexHtml(url, template);
        
        console.log(`[VITE SERVE] Transformed successfully. Dispatching document headers.`);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        console.error(`💥 [VITE ERROR] Failed serving index.html over: ${url}. Error:`, e);
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`[BOOT] Production Mode: Serving static bundles from: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      console.log(`[PROD ROUTE MATCH] Fallback html requested: ${req.originalUrl}`);
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production-grade server running on port ${PORT}`);
  });
}

startServer();
