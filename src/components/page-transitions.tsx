"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageTransitions({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }, [pathname, prefersReduced]);

  const initial = prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 };
  const animate = prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 };
  const exit = prefersReduced ? { opacity: 0 } : { opacity: 0, y: -10 };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main key={pathname} initial={initial} animate={animate} exit={exit}>
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
