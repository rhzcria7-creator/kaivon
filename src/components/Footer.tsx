import { motion } from 'motion/react';
import BlurText from './BlurText';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full py-10 text-center text-[10px] uppercase tracking-[0.3em] font-medium text-[#111]/30 z-10 relative flex flex-col items-center gap-4"
    >
      <div className="w-1/4 h-px bg-gradient-to-r from-transparent via-[#111]/10 to-transparent" />
      <div className="flex gap-4 items-center">
        <BlurText text="BUILT WITH PRECISION • 2026 KAIVON." delay={50} direction="bottom" animateBy="letters" />
      </div>
    </motion.footer>
  );
}
