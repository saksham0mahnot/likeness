"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";
import Lightbox, { type LightboxContent } from "@/components/lightbox";

type Category = "Commercial" | "Narrative" | "Social";

type Project = {
  id: number;
  title: string;
  thumb: string;
  href?: string;
  tags: string[];
  category: Category;
  previewVideo?: string; // optional mp4/webm for hover preview
};

const projects: Project[] = [
  {
    id: 1,
    title: "Visuals Montage",
    // thumb: "/visuals.png",
    thumb: "/1.jpg",
    href: "https://www.instagram.com/likeness.0/",
    tags: ["Montage", "Visuals"],
    category: "Commercial",
  },
  {
    id: 2,
    title: "Twitter X Edit",
    // thumb: "/twitter-x.jpg",
    thumb: "/2.jpg",
    href: "https://www.instagram.com/likeness.0/",
    tags: ["Social", "Edit"],
    category: "Social",
  },
  {
    id: 3,
    title: "Cinematic Cut",
    // thumb: "/bg-2.jpg",
    thumb: "/3.jpg",
    href: "https://www.instagram.com/likeness.0/",
    tags: ["Narrative", "Trailer"],
    category: "Narrative",
  },
];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<LightboxContent | undefined>();

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="py-10">
      <div className="mx-auto mb-6 flex max-w-6xl flex-wrap items-center gap-2 px-4">
        {(["All", "Commercial", "Narrative", "Social"] as const).map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setFilter(cat)}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              filter === cat
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>
      <div className="mx-auto max-w-6xl columns-1 gap-6 px-4 sm:columns-2 md:columns-3 [column-fill:balance]
      ">
        <AnimatePresence mode="popLayout">
        {filtered.map((p, i) => (
          <motion.div
            layout
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 220, damping: 24, delay: i * 0.03 }}
            className="mb-6 break-inside-avoid"
          >
            <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="p-0">
                <button
                  type="button"
                  onClick={() => {
                    setContent({
                      title: p.title,
                      poster: p.thumb,
                      videoSrc: p.previewVideo,
                      externalHref: p.href,
                      layoutId: `proj-${p.id}`,
                    });
                    setOpen(true);
                  }}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {/* Hover video preview if available */}
                    {p.previewVideo ? (
                      <motion.video
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="h-full w-full object-cover"
                        poster={p.thumb}
                        src={p.previewVideo}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                        onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <motion.img
                        layoutId={`proj-${p.id}`}
                        src={p.thumb}
                        alt={p.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 rounded-none ring-0 transition group-hover:ring-2 group-hover:ring-primary/60" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40"
                    >
                      <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-black shadow-sm">
                        <Play className="h-3.5 w-3.5" />
                        Preview
                      </div>
                    </motion.div>
                  </div>
                </button>
                <div className="space-y-2 p-4">
                  <h3 className="text-base font-medium">{p.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="outline" className="border-primary/30 text-primary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
      <Lightbox open={open} onClose={() => setOpen(false)} content={content} />
    </section>
  );
}
