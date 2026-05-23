# KAIVON MASTER DOCUMENTATION
*Internal System Blueprint & Production-Grade Engineering Manual*

---

## 1. Project Overview

### Concept, Mission, & Vision
KAIVON is conceived as an ultra-premium, high-performance, minimalist digital platform. Moving beyond traditional portfolios, KAIVON is designed to be a "living operating system" (Kaivon OS) that integrates:
*   A world-class, Apple-inspired presentation layer.
*   An active, secure administrative backend dashboard.
*   An extensible model for content, project showcase, contact curation, and real-time telemetry.

Its mission is to present digital craft with Zero Compromise—proving that a gorgeous front-facing interactive canvas can coexist with safe, robust, enterprise-grade backend APIs, secure cookies, schema-validated transactions, and performant server lifecycle habits.

### Business Positioning & Audience
KAIVON caters to high-demand clients, venture firms, design-centric companies, and engineers seeking top-tier aesthetic execution. It elevates digital experience to high-end physical hardware levels (e.g., Apple, Leica, Teenage Engineering). It rejects standard SaaS UI cliches (e.g., neon gradients, chaotic panels) in favor of deep negative space, delicate light/shadow containment, high typographic standards, and cinematic physics of motion.

---

## 2. Core Identity

### UI/UX Philosophy
We follow the **Apple Design Language Guidelines** matched with **Stripe-like mathematical precision**:
1.  **Aesthetic Honesty**: Avoid gratuitous decorations. Elements only exist to frame content or respond to physical cursor physics.
2.  **Visual Friction Mitigation**: Generous margins, subtle background color changes, and balanced typographic weights maximize visual breathing room.
3.  **Physicality**: Transitions mimic kinetic inertia with high damping ratios ($0.5$ scale springs), avoiding distracting visual bounces.

### Spacing, Contrast, & Color Palettes
*   **Foreground Background Rhythm**: Standard views utilize an off-white background (`#fafafa`) countered by deep charcoal gray and absolute charcoal colors (`#111111`) for crisp, high-contrast readability.
*   **Bordering & Separators**: Fine borders utilizing semi-transparent grey dividers (`border-black/5` or `border-[#eaeaea]`).
*   **Accent Colorways**: Minimal, functional, and sutil indigo-to-purple curves (`from-blue-100/40 via-purple-100/40`) used purely to represent background depth or custom interactions.

| Purpose | Variable / Class | Exact HEX / RGBA Value | Notes |
| :--- | :--- | :--- | :--- |
| Core Canvas | `bg-[#fafafa]` | `#FAFAFA` | Main paper texture |
| Strong Type | `text-[#111]` | `#111111` | Absolute charcoal brand color |
| Muted Type | `text-[#666]` | `#666666` | Neutral grey secondary text |
| Whisper Type | `text-[#999]` | `#999999` | Inline labels, helper indicators |
| Delicate Border | `border-[#eaeaea]` | `#EAEAEA` | High-definition horizontal rulers |
| High Accent (Aura)| `from-blue-100/40` | `rgba(219, 234, 254, 0.4)`| Subtle background glow curves |

---

## 3. Full Frontend Architecture

### Framework Choice & Client Entry Points
Built with React 18+ inside Vite with TypeScript. To minimize entry load and improve the Time To First Paint (TTFP), the router splits code on route boundaries using dynamic lazy imports (`React.lazy`) encapsulated inside robust `<Suspense>` layers.

### Structural App Layouts
```
                             +-------------------+
                             |     App Entry     |
                             |    (AuthProvider) |
                             +---------+---------+
                                       |
                                       v
                             +---------+---------+
                             |    ClickSpark     |
                             |   (Visual Wrap)   |
                             +---------+---------+
                                       |
                   +-------------------+-------------------+
                   | (Is Public Route)                     | (Is Admin Route)
                   v                                       v
         +---------+---------+                   +---------+---------+
         |    PixelBlast     |                   |   Suspense Wrap   |
         | (Canvas Backing)  |                   +---------+---------+
         +---------+---------+                             |
                   |                                       v
                   v                             +---------+---------+
         +---------+---------+                   |   ProtectedRoute  |
         |  CardNav / Navbar |                   +---------+---------+
         +---------+---------+                             |
                   |                                       v
                   v                             +---------+---------+
         +---------+---------+                   |  DashboardLayout  |
         |   Page Route      |                   +---------+---------+
         |   (Suspense)      |                             |
         +---------+---------+                             v
                   |                            Individual Admin Views
                   v                            (Overview, Projects, Form,
         +---------+---------+                    Revenue, Analytics, etc.)
         |     Footer        |
         +-------------------+
```

### Modular Directory Tree
```
├── prisma/
│   ├── dev.db                  # Local high-durability developer SQLite file
│   └── schema.prisma           # Relational Prisma blueprints
├── public/                     # Static high-indexed assets (favicon, robots, sitemap)
├── src/
│   ├── components/             # Reusable UX elements & physics engines
│   │   ├── AnimatedList.tsx    # Low-lag, spring-buffered container
│   │   ├── AnimatedPage.tsx    # Route change transition buffer
│   │   ├── BlurText.tsx        # High-definition text decay-reveal
│   │   ├── BorderGlow.tsx      # Vector outline glow animation
│   │   ├── CardNav.tsx         # FS menu transition controller
│   │   ├── ClickSpark.tsx      # Multi-point micro-particle overlay
│   │   ├── Footer.tsx          # Permanent site closure section
│   │   ├── Navbar.tsx          # CardNav wrapper component
│   │   ├── PixelBlast.tsx      # GPU-accelerated backdrop canvas
│   │   ├── ProtectedRoute.tsx  # Dynamic authorization barrier
│   │   ├── SEO.tsx             # Semantic metadata generator
│   │   └── TiltedCard.tsx      # High-fidelity inertial 3D tilt
│   ├── hooks/
│   │   └── useAuth.tsx         # React Auth context & session logic
│   ├── layouts/
│   │   └── DashboardLayout.tsx # High-definition SaaS admin master frame
│   ├── pages/                  # Public and private route templates
│   │   ├── admin/
│   │   │   ├── AnalyticsAdmin.tsx
│   │   │   ├── ContactsAdmin.tsx
│   │   │   ├── FormsAdmin.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Overview.tsx
│   │   │   ├── ProjectsAdmin.tsx
│   │   │   ├── RevenueAdmin.tsx
│   │   │   └── SettingsAdmin.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   └── Socials.tsx
│   ├── index.css               # Global styling, fonts & theme configurations
│   ├── main.tsx                # Client Hydrator & React DOM root
│   ├── types.ts                # TypeScript interfaces
│   └── vite-env.d.ts           # Development environment overrides
├── .env.example                # Secret blueprint variables
├── package.json                # Project manifest, script runners & dependency configs
├── prisma.config.ts            # Local ORM profile
├── server.ts                   # Production-grade Express Server and APIs
├── tsconfig.json               # Strictly typed standard specs
└── vite.config.ts              # Modular asset compiler config
```

---

## 4. Motion + Animation System

### Animation Integration Architecture
KAIVON harmonizes two major motion engines, utilizing each for its technical strengths:
*   **Framer Motion (`motion/react`)**: Chosen for declarations, gestures, simple viewport detection, spring transitions, and DOM layouts.
*   **GSAP**: Used for precise timelines, spatial multi-coordinate transformations, clip-path morphing, and compound sequential animations.

### Custom Motion Integrations

#### 1. BorderGlow
A vector-based glowing outline system.
*   **Why**: It provides subtle dynamic lighting on active containers without costly continuous DOM repaints.
*   **How**: Computes mathematical radial gradient angles across borders and translates them to low-overhead CSS variables.
*   **Performance**: Offloaded to GPU compositing via `transform-gpu` and strict `will-change` guidelines.

#### 2. TiltedCard
Inertial 3D hover physics.
*   **Why**: Generates a high-end tactile experience for showcased content.
*   **How**: Utilizes reactive Framer Motion springs (`useSpring`), transforming local pointer offsets into continuous 3D rotation coordinates (`rotateX`, `rotateY`).
*   **GPU Optimizations**: Incorporates `transform-style: preserve-3d` and `will-change: transform`. On mobile viewports or devices with `prefers-reduced-motion` active, calculations are completely bypassed for stability.

#### 3. CardNav
Cinematic expanding menu system.
*   **Why**: Completely turns navigation into an interactive experience.
*   **How**: Overrides full-screen overlays using a GSAP timeline that triggers a dynamic `clip-path: inset(...)` circle mask, followed by staggered card entrances with coordinated rotational delays (`rotateX`, `translateY`).
*   **Handling Scroll Lock**: Automatically locks scroll actions during menu expansion to prevent layout jumps.

---

## 5. UI Component System

### Modular UI Directory Guide

#### `<SEO />`
A critical component injected into all public pages to render high-definition metadata.
*   **Props**: `title`, `description`, `keywords`, `image`, `url`, `type`.
*   **Capabilities**: Auto-injects semantic OpenGraph metadata, structured JSON-LD schemas, canonical links, and search indexing parameters.

#### `<BlurText />`
*   **Props**: `text`, `delay`, `animateBy` ('letters' | 'words'), `direction`.
*   **Visual Outcome**: Characters gracefully fade into place using a calculated CSS blur shift (`filter: blur(...)`).

#### `<TiltedCard />`
*   **Props**: `children`, `scaleOnHover`, `rotateAmplitude`.
*   **Safety Features**: Suppresses all hover physics on touch-based devices to avoid jumpy scrolling.

---

## 6. Backend System & API Architecture

### Modular Express Backing
We run a high-performance Express.js server inside a custom TypeScript runner (`tsx` in dev, compiled standalone `esbuild` standard in production). This serves both API requirements and React bundle delivery with equal efficiency.

### Complete API Spec

#### Authentication Endpoint (`POST /api/auth/login`)
*   **Required Payload**: `{ password: string, email?: string }`
*   **Processing Rules**: Checks the admin credential against SQLite hashes using `bcryptjs` (salted with $12$ rounds).
*   **Response Headers**: Generates a secure JWT token and writes it directly to the browser as an **HTTP-Only, Secure, SameSite=Strict** cookie (`admin_token`).
*   **Response Payload**: `{ success: true, email: string }`

#### Session Validation (`GET /api/auth/me`)
*   **Authentication**: Reads the secure `admin_token` cookie.
*   **Output**: Returns decrypted user credentials.

#### Logout Endpoint (`POST /api/auth/logout`)
*   **Result**: Instantly clears `admin_token` headers.

#### Projects Retrieve (`GET /api/projects`)
*   **Access**: Public.
*   **Database Action**: Fetches projects ordered by creation date.

#### Projects Creation (`POST /api/projects`)
*   **Access**: Protected (Requires valid ADMIN token).
*   **Processing Rules**: Validates payload schemas with Zod and stores record inside SQLite.

---

## 7. Database Architecture

### Data Models (Prisma Blueprints)
Our architecture utilizes Prisma for type safety and SQLite to ensure local data persistence.

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      String   @default("ADMIN")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  tags        String   // Comma-separated or JSON array representation
  year        String
  category    String
  status      String   @default("DRAFT")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  status    String   @default("NEW")
  createdAt DateTime @default(now())
}

model Setting {
  key       String   @id
  value     String
  updatedAt DateTime @updatedAt
}
```

```
+-------------------------------------------------------+
|                      SCHEMA.PRISMA                    |
+-------------------------------------------------------+
|  User (Admin Accounts)                                |
│    - id (CUID, PK)                                    │
│    - email (String, Unique)                           │
│    - password (String, Blowfish Hashed)               │
│    - role (ADMIN)                                     │
+-------------------------------------------------------+
|  Project (Portfolio Store)                            |
│    - id (CUID, PK)                                    │
│    - title, description, tags, year, category         │
│    - status (DRAFT | PUBLISHED)                       │
+-------------------------------------------------------+
|  ContactMessage (Telemetry Leads)                     |
│    - id (CUID, PK)                                    │
│    - name, email, subject, message                    │
│    - status (NEW | ARCHIVED)                          │
+-------------------------------------------------------+
```

### Production Migration Strategy (To PostgreSql/Supabase)
To scale this SQLite instance to Enterprise production (PostgreSQL), developers only need to update variables inside the schema:
1.  Swap the `datasource db` provider to `"postgresql"`.
2.  Change database URLs inside `.env` to point to a secure Supabase connection pool.
3.  Deploy migrations using `npx prisma db push`.

---

## 8. Security Architecture

### Comprehensive Hardening Strategy
KAIVON is heavily defended across multiple vectors:

```
                  +-----------------------------------+
                  |        Incoming Request           |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------+-----------------+
                  |      Express-Rate-Limit           |
                  |     (Blocks DDoS / Spam)          |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------+-----------------+
                  |          Helmet OS HF             |
                  |    (Injects Security Headers)     |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------+-----------------+
                  |      Route Guard Middleware       |
                  |    (HttpOnly JWT Verification)    |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------+-----------------+
                  |         Database Layer            |
                  |   (Prisma SQL Injection Shield)   |
                  +-----------------------------------+
```

1.  **XSS & Clickjacking Prevention**: Implements Helmet middleware to strip identity headers and control frames.
2.  **CSRF & Session Hijacking**: JWTs are locked behind strict HttpOnly cookies, completely blocking access from malicious client-side JavaScript.
3.  **SQL Injections**: Prisma ORM sanitizes internal query strings via strictly typed parameter bindings.
4.  **DDoS & Brute Force Mitigation**: Limits API requests with `express-rate-limit`, permitting up to $100$ calls every $15$ minutes per individual IP route.

---

## 9. Performance Engineering

### Core Web Vitals Strategy
KAIVON targets $95+$ overall performance results on standard diagnostic runtimes:
*   **LCP (Largest Contentful Paint)**: Critical page loads (above-the-fold content) are processed sequentially, deferring dynamic assets to avoid blocking.
*   **CLS (Cumulative Layout Shift)**: Rigid placeholders, dimensional containers, and exact aspect-ratio parameters prevent visual page stuttering while images load.
*   **FID (First Input Delay)**: Offloads heavy interaction animations to GPU matrices via native browser frameworks.

### Bundle Sizes, CDN Delivery, & Lazy Loads
Heavy animation engines and complex layouts are dynamically code-split:
```typescript
const Login = lazy(() => import('./pages/admin/Login'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
```
This isolates admin panel payloads, protecting public visitors from loaded admin scripts and ensuring lightning-fast initial page loads.

---

## 10. SEO + Discoverability

### Dynamic Indexes & Structured JSON-LD Data
All routes are managed dynamically using `<SEO />` components. The root path automatically generates structured JSON-LD schemas:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kaivon",
  "url": "https://kaivon.os",
  "image": "https://kaivon.os/og-image.jpg"
}
```

This structural metadata ensures search engines correctly parse authorship, content categories, and media references.

### Sitemap & Discoverability Assets
KAIVON includes structural discoverability assets inside public folders:
*   `/robots.txt`: Explicitly directs indexing robots and links paths directly to sitemap XML indexes.
*   `/sitemap.xml`: Establishes clear priorities and update intervals across primary portfolio routes, enhancing discoverability on search platforms and discovery hubs.

---

## 11. AI Systems

### Content Classification & Smart Layouts
The platform's project and portfolio management structures are designed to support artificial intelligence integrations:
*   **Vectorization Preparation**: Storing categorical and text-based tags in JSON arrays prepares project logs for vector embedding indexing (e.g., Pinecone, pgvector).
*   **Smart Recommendation Rules**: Dynamic matching engines analyze stored project arrays to instantly serve context-relevant project suggestions.

---

## 12. Infrastructure + DevOps

### Production Flow & Bundle Orchestration
*   **Source Assembly**: Standard asset compilation built with Vite.
*   **Express Layer Bundling**: The server is compiled into a highly performant CJS file (`dist/server.cjs`) using `esbuild` to optimize start times.

```json
"build": "prisma generate && vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs"
```

---

## 13. Responsive Strategy

### Fluid Tailwind Grids & Hardware Fallbacks
*   **Mobile Sidebar Designs**: On touch screens or small viewports, the admin sidebar collapses into a compact navigation drawer that utilizes native CSS overlays to minimize GPU overhead.
*   **Kinetic Adaptation**: Complicated spring physics and canvas calculations are scaled down or disabled on mobile viewports:

```typescript
useEffect(() => {
  const checkDevice = () => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  };
  checkDevice();
  window.addEventListener('resize', checkDevice, { passive: true });
  return () => window.removeEventListener('resize', checkDevice);
}, []);
```

---

## 14. Accessibility

### Focus Controls & Accessibility Design
*   **Focus Ring Management**: Interactive elements feature high-contrast outlines for accessible keyboard navigation.
*   **Semantic Dividers**: Navigational layouts utilize precise ARIA role definitions (`role="nav"`, `role="aside"`, `aria-label="Toggle Menu"`).
*   **Reduced Animation Controls**: Disables hover animations and canvas calculations on devices with `prefers-reduced-motion` to keep the user experience safe and comfortable.

---

## 15. Developer Workflow

### Installation Guide
1.  Verify dependency versions inside `package.json`.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Deploy internal schemas to SQLite:
    ```bash
    npx prisma db push
    ```
4.  Launch the local environment:
    ```bash
    npm run dev
    ```

### Env Profile (`.env.example`)
To run securely in production, configure these variables:
```env
# Database Connections
DATABASE_URL="file:./dev.db"

# Core Access Secrets
JWT_SECRET="generate-a-long-sha-256-hash-for-production"

# Production Variables
NODE_ENV="production"
```

---

## 16. Future Roadmap

### Scaling Plan & Premium Feature Strategy
*   **Tier 1: High-Performance Database Systems**: Swap underlying database engines to pgvector-ready PostgreSQL instances.
*   **Tier 2: Enterprise CMS Integrations**: Build a rich, visual content editor inside the admin panel to schedule posts and manage draft streams.
*   **Tier 3: Advanced Telemetry**: Add a secure analytics engine to record real-time visitor metrics right on the dashboard.

---

## 17. Full Technical Philosophy

KAIVON represents a modern approach to web engineering:
> *"Digital craft is a unified experience. Visual interfaces should display aesthetic excellence; backend architectures must run with clean, optimized code models, parameter protection, and fast, lightweight execution limits."*

Every component on the platform is built to deliver this standard. Behind its minimalist, Apple-inspired interface, KAIVON relies on robust structures, secure cookie management, dynamic route splitting, and optimal database flows. This balance ensures a secure, performant, and production-ready solution that scales effortlessly.
