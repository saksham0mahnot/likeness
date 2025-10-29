"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Lightbox, { type LightboxContent } from "@/components/lightbox";

export type Reel = {
  id: number;
  title: string;
  thumb: string;
  tags?: string[];
  previewVideo?: string;
  externalHref?: string;
  theme?: "cyan" | "violet" | "amber";
};

const reels: Reel[] = [
  { id: 1, title: "Cinematic Reel", thumb: "/visuals.png", tags: ["Reel", "Edit"], externalHref: "https://www.instagram.com/likeness.0/", theme: "cyan" },
  { id: 2, title: "Branded Edits", thumb: "/twitter-x.jpg", tags: ["Brand", "Social"], externalHref: "https://www.instagram.com/likeness.0/", theme: "violet" },
  { id: 3, title: "Music Videos", thumb: "/bg-2.jpg", tags: ["Music", "Cut"], externalHref: "https://www.instagram.com/likeness.0/", theme: "amber" },
];

export default function ReelsCarousel() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1 for current slide
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<LightboxContent | undefined>();
  const total = reels.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);
  const goTo = (i: number) => setIndex(((i % total) + total) % total);

  const AUTOPLAY_MS = 4000;
  // Autoplay + progress when not hovering
  useEffect(() => {
    setProgress(0);
    if (hovering) return;
    let start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / AUTOPLAY_MS);
      setProgress(p);
      if (p >= 1) {
        go(1);
        start = performance.now();
        setProgress(0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, hovering]);

  // Calculate slide width responsively
  const slideWidth = useMemo(() => 320, []); // base width used for translateX; layout uses CSS for real sizing

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 60;
    const v = info.velocity.x;
    const dx = info.offset.x;
    if (dx < -threshold || v < -300) return go(1);
    if (dx > threshold || v > 300) return go(-1);
  };

  // Scrub state for progress bar
  const [scrubbing, setScrubbing] = useState<{bar: number; startX: number} | null>(null);

  const onBarMouseDown = (i: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setIndex(i);
    setProgress(ratio);
    setScrubbing({ bar: i, startX: e.clientX });
  };

  const onBarMouseMove = (i: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubbing || scrubbing.bar !== i) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setProgress(ratio);
  };

  const onBarMouseUp = () => setScrubbing(null);

  return (
    <section id="reels" className="py-8">
      <div
        className="mx-auto max-w-6xl px-4"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {reels.map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-10 cursor-pointer rounded-full bg-foreground/20"
                onClick={() => goTo(i)}
                onMouseDown={(e) => onBarMouseDown(i, e)}
                onMouseMove={(e) => onBarMouseMove(i, e)}
                onMouseUp={onBarMouseUp}
              >
                <motion.div
                  className="h-1.5 rounded-full bg-primary"
                  initial={false}
                  animate={{ width: i === index ? `${Math.max(4, progress * 100)}%` : i < index ? "100%" : "0%" }}
                  transition={{ duration: 0.15 }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div ref={containerRef} className="relative overflow-hidden">
          <motion.div
            className="flex gap-4"
            drag="x"
            dragConstraints={{ left: -Infinity, right: Infinity }}
            onDragEnd={onDragEnd}
            animate={{ x: -index * (slideWidth + 16) }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ willChange: "transform" }}
          >
            {reels.map((r) => (
              <motion.div
                key={r.id}
                className={`group relative w-[min(80vw,22rem)] shrink-0 overflow-hidden rounded-2xl border`}
                whileHover={{ y: -2 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setContent({ title: r.title, poster: r.thumb, videoSrc: r.previewVideo, externalHref: r.externalHref, layoutId: `reel-${r.id}` });
                    setOpen(true);
                  }}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden">
                    {r.previewVideo ? (
                      <motion.video
                        className="h-full w-full object-cover"
                        poster={r.thumb}
                        src={r.previewVideo}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                        onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <motion.img
                        layoutId={`reel-${r.id}`}
                        src={r.thumb}
                        alt={r.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                    )}
                    <div className={`pointer-events-none absolute inset-0 ring-0 transition group-hover:ring-2 ${
                      r.theme === "violet" ? "group-hover:ring-fuchsia-400/50" : r.theme === "amber" ? "group-hover:ring-amber-400/50" : "group-hover:ring-cyan-400/50"
                    }`} />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs">
                      <div className="flex flex-wrap gap-1">
                        {r.tags?.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className={`${
                              r.theme === "violet"
                                ? "bg-fuchsia-500/20 text-fuchsia-200"
                                : r.theme === "amber"
                                ? "bg-amber-400/20 text-amber-200"
                                : "bg-cyan-400/20 text-cyan-200"
                            } backdrop-blur`}
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-black shadow">
                        <Play className="h-3.5 w-3.5" />
                        View
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        <Lightbox
          open={open}
          onClose={() => setOpen(false)}
          content={content}
          onPrev={() => {
            const next = (index - 1 + reels.length) % reels.length;
            setIndex(next);
            const r = reels[next];
            setContent({ title: r.title, poster: r.thumb, videoSrc: r.previewVideo, externalHref: r.externalHref });
          }}
          onNext={() => {
            const next = (index + 1) % reels.length;
            setIndex(next);
            const r = reels[next];
            setContent({ title: r.title, poster: r.thumb, videoSrc: r.previewVideo, externalHref: r.externalHref });
          }}
        />
      </AnimatePresence>
    </section>
  );
}
