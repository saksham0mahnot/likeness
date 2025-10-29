"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-5">
        <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative md:col-span-2 group">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border transition-all duration-300 ring-0 group-hover:-translate-y-1 group-hover:ring-2 group-hover:ring-primary/40 group-hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.25)]">
            <Image src="/profile.png" alt="Saksham Mahnot" fill className="object-cover" />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-3">
          <h3 className="text-xl font-semibold tracking-tight">Hi, I’m Saksham Mahnot</h3>
          <p className="mt-3 text-muted-foreground">
            I’m a video editor who loves shaping rhythm, emotion, and clarity. From branded shorts to music videos and narrative pieces, I focus on creating an engaging flow and a memorable finish.
          </p>
          <p className="mt-3 text-muted-foreground">
            Tools I use daily: Premiere Pro, DaVinci Resolve, After Effects, and a solid sense of timing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
