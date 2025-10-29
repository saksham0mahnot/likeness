"use client";

import { motion } from "framer-motion";

type Props = { id?: string; eyebrow?: string; title: string; subtitle?: string };

export default function SectionHeader({ id, eyebrow, title, subtitle }: Props) {
  return (
    <div id={id} className="mx-auto mb-10 max-w-6xl px-4">
      {eyebrow && (
        <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </motion.p>
      )}
      <div className="mt-1 overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl font-semibold tracking-tight md:text-3xl"
        >
          {title}
        </motion.h2>
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 64, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-2 block h-0.5 rounded-full bg-primary/70"
        />
      </div>
      {subtitle && (
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-2 max-w-prose text-muted-foreground">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
