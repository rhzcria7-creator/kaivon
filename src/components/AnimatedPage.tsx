import { motion } from 'motion/react';
import { ReactNode } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 15, filter: 'blur(10px)' },
  in: { opacity: 1, y: 0, filter: 'blur(0px)' },
  out: { opacity: 0, y: -15, filter: 'blur(10px)' }
};

const pageTransition: any = {
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.6
};

export default function AnimatedPage({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={`min-h-screen pt-32 pb-24 w-full flex flex-col items-center relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
