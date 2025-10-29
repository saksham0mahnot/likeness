"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const reels = [
  { id: 1, title: "Cinematic Reel" },
  { id: 2, title: "Branded Edits" },
  { id: 3, title: "Music Videos" },
  { id: 4, title: "Short Form" },
];

export default function ReelsMarquee() {
  return (
    <section id="reels" className="relative my-8 overflow-hidden py-10">
      <motion.div
        initial={{ x: "-10%" }}
        animate={{ x: "-110%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-6 whitespace-nowrap"
      >
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="inline-flex items-center gap-3 rounded-full border bg-white/80 px-5 py-2 text-sm shadow-sm dark:bg-black/50">
            <Play className="h-4 w-4" />
            <span className="font-medium tracking-tight">{reels[idx % reels.length].title}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
