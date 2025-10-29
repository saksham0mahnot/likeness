"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { Play, Instagram } from "lucide-react";
import Magnetic from "@/components/magnetic";

export default function Hero() {
  const { scrollY } = useScroll();
  const textParallax = useTransform(scrollY, [0, 400], [0, -30]);
  const imgParallax = useTransform(scrollY, [0, 400], [0, 20]);
  // Tilt interactions for the profile card
  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const rotateX = useTransform(ty, [0, 1], [8, -8]);
  const rotateY = useTransform(tx, [0, 1], [-8, 8]);

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height; // 0..1
    tx.set(x);
    ty.set(y);
  };

  const onLeave = () => {
    tx.set(0.5);
    ty.set(0.5);
  };

  return (
    <section className="relative overflow-hidden pt-28" id="home">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ y: textParallax }}>
          <p className="mb-3 text-sm uppercase tracking-widest text-muted-foreground">Saksham Mahnot</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Crafting stories through cut, rhythm, and motion.
          </h1>
          <p className="mt-4 max-w-prose text-muted-foreground">
            Video editor specializing in cinematic cuts, branded content, and social-first storytelling. Available for freelance and collaborations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Magnetic>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg">
                  <a href="#work"><Play className="mr-2 h-4 w-4" /> View Work</a>
                </Button>
              </motion.div>
            </Magnetic>
            <Magnetic>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="secondary" size="lg">
                  <a href="https://www.instagram.com/likeness.0/" target="_blank"><Instagram className="mr-2 h-4 w-4" /> Instagram</a>
                </Button>
              </motion.div>
            </Magnetic>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
          style={{ y: imgParallax }}
        >
          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative mx-auto aspect-square w-64 overflow-visible md:w-80"
          >
            <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-to-br from-purple-500/20 via-fuchsia-400/10 to-amber-400/10 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-white to-zinc-50 p-2 shadow-2xl ring-1 ring-black/5 dark:from-zinc-900 dark:to-zinc-800">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full overflow-hidden rounded-2xl"
                style={{ transform: "translateZ(30px)" }}
              >
                <Image src="/profile.png" alt="Saksham Mahnot" fill className="object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
