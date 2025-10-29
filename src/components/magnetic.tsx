"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  strength?: number; // pixels pull radius
};

export default function Magnetic({ children, strength = 20 }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.3 });
  const dy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.3 });

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    const dist = Math.sqrt(mx * mx + my * my);
    const factor = Math.min(1, dist / 100);
    x.set((mx / (r.width / 2)) * strength * factor);
    y.set((my / (r.height / 2)) * strength * factor);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: dx, y: dy }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}
