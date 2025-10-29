"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clapperboard, Scissors, Sparkles, Video } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Clapperboard, title: "Post-Production", desc: "End-to-end edits for commercials, films, and music videos." },
  { icon: Scissors, title: "Short-Form", desc: "Snappy content for Instagram, Reels, and YouTube Shorts." },
  { icon: Sparkles, title: "Color & Sound", desc: "Light grade, basic sound polish, and finishing touches." },
  { icon: Video, title: "Motion & Titles", desc: "Clean motion graphics, titles, and lower-thirds." },
];

export default function Services() {
  return (
    <section id="services" className="py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ring-0 hover:ring-2 hover:ring-primary/40">
              <CardContent className="space-y-3 p-5">
                <s.icon className="h-6 w-6" />
                <h3 className="text-base font-medium">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
