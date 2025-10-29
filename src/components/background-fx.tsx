"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function BackgroundFX() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spx = useSpring(mx, { stiffness: 50, damping: 20 });
  const spy = useSpring(my, { stiffness: 50, damping: 20 });

  const blob1X = useTransform(spx, [0, 1], ["-50%", "-48%"]);
  const blob1Y = useTransform(spy, [0, 1], ["-10%", "-8%"]);
  const blob2X = useTransform(spx, [0, 1], ["0%", "-2%"]);
  const blob2Y = useTransform(spy, [0, 1], ["0%", "2%"]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set(e.clientX / w);
      my.set(e.clientY / h);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04] dark:opacity-[0.06]" aria-hidden>
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Rotating light rays */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[140vh] w-[140vh] -translate-x-1/2 rounded-full opacity-[0.06] [background:conic-gradient(from_0deg,transparent_0deg,rgba(124,58,237,0.5)_60deg,transparent_120deg,transparent_240deg,rgba(14,165,233,0.45)_300deg,transparent_360deg)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated gradient glow blobs with parallax */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600/28 via-fuchsia-600/18 to-rose-500/18 blur-3xl"
        style={{ x: blob1X, y: blob1Y }}
        initial={{ opacity: 0.32, scale: 0.95 }}
        animate={{ opacity: 0.42, scale: 1 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-12rem] right-[-8rem] size-[32rem] rounded-full bg-gradient-to-tr from-cyan-500/20 via-sky-600/18 to-indigo-700/18 blur-3xl"
        style={{ x: blob2X, y: blob2Y }}
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 0.36 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Sparkles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute size-1.5 rounded-full bg-cyan-200/30 shadow-[0_0_12px_rgba(34,211,238,0.25)] dark:bg-violet-200/30"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          initial={{ opacity: 0.12, y: 0 }}
          animate={{ opacity: [0.12, 0.4, 0.12], y: [-4, 4, -4] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Radial vignette to keep content readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,20,20,0.55),rgba(20,20,20,0.9))] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6),rgba(0,0,0,0.95))]" />

      {/* Noise overlay for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:3px_3px]" />
    </div>
  );
}
