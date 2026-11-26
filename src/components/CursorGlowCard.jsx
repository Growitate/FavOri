import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function CursorGlowCard({
  children,
  className = '',
  onClick,
  as = 'div',
  enableLift = true,
  ...rest
}) {
  const cardRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e) => {
    if (prefersReduced || !cardRef.current) return;
    if (window.matchMedia && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlow({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setGlow((prev) => ({ ...prev, active: false }));
  };

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={enableLift && !prefersReduced ? { y: -6 } : undefined}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-[28px] bg-surface card-shadow overflow-hidden transition-shadow duration-300 hover:card-shadow-lg ${className}`}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${glow.x}% ${glow.y}%, rgba(184, 121, 74, 0.11), rgba(241, 233, 221, 0.12) 45%, transparent 72%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </MotionTag>
  );
}
