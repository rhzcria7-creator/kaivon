import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string | number;
  containerWidth?: string | number;
  imageHeight?: string | number;
  imageWidth?: string | number;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  scaleOnHover = 1.02,
  rotateAmplitude = 10,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handlePointerEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative transform-gpu will-change-transform perspective-[1000px] ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
      }}
      animate={{
        scale: isHovered && !isMobile ? scaleOnHover : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div 
        style={{ 
          transform: isHovered && !isMobile ? 'translateZ(40px)' : 'translateZ(0px)', 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
        }} 
        className="w-full h-full relative"
      >
         {children}
      </div>
    </motion.div>
  );
};

export default TiltedCard;
