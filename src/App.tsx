/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load heavy physics/canvas components
const PixelBlast = lazy(() => import('./components/PixelBlast'));
const ClickSpark = lazy(() => import('./components/ClickSpark'));

// Lazy load public pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Socials = lazy(() => import('./pages/Socials'));
const Projects = lazy(() => import('./pages/Projects'));

// Lazy load admin pages to reduce main bundle size
const Login = lazy(() => import('./pages/admin/Login'));
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const Overview = lazy(() => import('./pages/admin/Overview'));
const ProjectsAdmin = lazy(() => import('./pages/admin/ProjectsAdmin'));
const FormsAdmin = lazy(() => import('./pages/admin/FormsAdmin'));
const RevenueAdmin = lazy(() => import('./pages/admin/RevenueAdmin'));
const AnalyticsAdmin = lazy(() => import('./pages/admin/AnalyticsAdmin'));
const ContactsAdmin = lazy(() => import('./pages/admin/ContactsAdmin'));
const SettingsAdmin = lazy(() => import('./pages/admin/SettingsAdmin'));

// Loading fallbacks
const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
    <div className="w-8 h-8 rounded-full border-2 border-[#111] border-t-transparent animate-spin"></div>
  </div>
);

const PublicLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-transparent">
    <div className="w-6 h-6 rounded-full border border-black/10 border-t-black/40 animate-spin"></div>
  </div>
);

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <Suspense fallback={null}>
        <ClickSpark
          sparkColor="#111"
          sparkRadius={30}
          sparkCount={12}
          sparkSize={12}
          duration={600}
        >
          {!isAdminRoute && (
            <div className="fixed inset-0 w-full h-full pointer-events-auto opacity-70 z-0">
              <Suspense fallback={null}>
                <PixelBlast
                  variant="circle"
                  pixelSize={6}
                  color="#2a3038"
                  patternScale={3}
                  patternDensity={1.2}
                  pixelSizeJitter={0.5}
                  enableRipples
                  rippleSpeed={0.4}
                  rippleThickness={0.12}
                  rippleIntensityScale={1.5}
                  liquid
                  liquidStrength={0.12}
                  liquidRadius={1.2}
                  liquidWobbleSpeed={5}
                  speed={0.6}
                  edgeFade={0.25}
                  transparent
                  antialias={false}
                />
              </Suspense>
            </div>
          )}

          <div className="relative min-h-screen flex flex-col">
            {!isAdminRoute && <Navbar />}

            <main className={isAdminRoute ? "w-full flex-grow flex flex-col" : "relative z-10 w-full flex-grow flex flex-col items-center pt-32"}>
              <AnimatePresence mode="wait">
                <Suspense fallback={isAdminRoute ? <AdminLoader /> : <PublicLoader />}>
                  <Routes location={location} key={location.pathname.startsWith('/dashboard') ? 'dashboard' : location.pathname}>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/socials" element={<Socials />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Overview />} />
                        <Route path="projects" element={<ProjectsAdmin />} />
                        <Route path="forms" element={<FormsAdmin />} />
                        <Route path="revenue" element={<RevenueAdmin />} />
                        <Route path="analytics" element={<AnalyticsAdmin />} />
                        <Route path="contacts" element={<ContactsAdmin />} />
                        <Route path="settings" element={<SettingsAdmin />} />
                      </Route>
                    </Route>
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </main>

            {!isAdminRoute && <Footer />}
          </div>
        </ClickSpark>
      </Suspense>
    </AuthProvider>
  );
}
