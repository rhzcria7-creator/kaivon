import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import BlurText from './BlurText';

interface MenuLink {
  path: string;
  label: string;
}

interface CardNavProps {
  links: MenuLink[];
}

export default function CardNav({ links }: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!menuContainerRef.current) return;
    
    // Using GSAP for smooth timeline animation, optimized for layout thrashing
    timelineRef.current = gsap.timeline({ paused: true, defaults: { ease: 'power4.inOut' } });
    
    timelineRef.current.to(menuContainerRef.current, {
      duration: 0.6,
      clipPath: isMobile ? 'inset(0% 0% 0% 0% round 24px)' : 'inset(0% 0% 0% 0% round 32px)',
      autoAlpha: 1,
      display: 'block'
    });

    timelineRef.current.fromTo(
      cardRefs.current,
      { y: 60, opacity: 0, rotateX: 20 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.05, duration: 0.8 },
      '<0.2'
    );

    return () => {
      timelineRef.current?.kill();
    };
  }, [isMobile]);

  useEffect(() => {
    if (isOpen) {
      timelineRef.current?.play();
      // Lock scroll 
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      timelineRef.current?.reverse();
      // Restore scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 h-[60px] w-[90%] max-w-[560px] rounded-2xl bg-white/60 backdrop-blur-xl border border-white/20 shadow-lg flex items-center justify-between px-6 pointer-events-auto"
      >
        <NavLink to="/" onClick={closeMenu} className="text-sm font-bold tracking-widest uppercase text-[#111]">
          <BlurText text="KAIVON" delay={100} animateBy="letters" />
        </NavLink>

        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-[#111] ${
                    isActive ? 'text-[#111] border-b border-[#111] pb-0.5' : 'text-[#111]/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button 
          onClick={toggleMenu}
          className="md:hidden relative w-10 h-10 -mr-2 rounded-full flex items-center justify-center transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-[#111]" /> : <Menu className="w-5 h-5 text-[#111]" />}
        </button>
      </motion.nav>

      <div 
        ref={menuContainerRef}
        style={{ 
          clipPath: 'inset(10% 50% 90% 50% round 32px)',
          visibility: 'hidden',
          display: 'none',
          opacity: 0,
          perspective: '1000px',
          WebkitOverflowScrolling: 'touch'
        }}
        className="fixed inset-2 sm:inset-10 top-24 z-40 bg-white/90 backdrop-blur-3xl border border-black/5 rounded-[24px] sm:rounded-[32px] p-4 sm:p-12 overflow-y-auto"
      >
        <div className="w-full max-w-xl mx-auto flex flex-col min-h-full pb-10">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#111]/50 mb-6 sm:mb-8 ml-2 mt-4 sm:mt-0">Navigation</p>
          
          <div className="flex flex-col gap-3 sm:gap-4 flex-grow">
            {links.map((link, index) => (
              <NavLink
                to={link.path}
                key={link.path}
                ref={(el) => { cardRefs.current[index] = el; }}
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block text-left p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-colors duration-300 ease-out flex items-center justify-between group transform-gpu will-change-transform ${
                    isActive 
                      ? 'bg-[#111] border-[#111] text-white shadow-xl' 
                      : 'bg-white/50 border-black/5 text-[#111] hover:bg-white hover:shadow-lg hover:border-black/10'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="text-xl sm:text-4xl font-bold tracking-tight">
                      {link.label}
                    </span>
                    <span className={`transform transition-transform duration-500 group-hover:translate-x-2 ${isActive ? 'text-white' : 'text-[#111]/30'}`}>
                      →
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between px-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#111]/40">
            <span>© 2026 KAIVON</span>
            <span>Minimal Digital</span>
          </div>
        </div>
      </div>
    </>
  );
}
