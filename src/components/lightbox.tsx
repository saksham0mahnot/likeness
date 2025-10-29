"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect } from "react";

export type LightboxContent = {
  title: string;
  description?: string;
  poster?: string;
  videoSrc?: string; // optional mp4/webm for local preview
  externalHref?: string; // external link (e.g., Instagram)
  layoutId?: string; // shared element id from grid thumbnail
};

export default function Lightbox({
  open,
  onClose,
  content,
  onPrev,
  onNext,
}: {
  open: boolean;
  onClose: () => void;
  content?: LightboxContent;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-[61] w-full max-w-4xl overflow-hidden rounded-2xl border bg-black text-foreground shadow-2xl"
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {onPrev && (
              <button
                onClick={onPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-2 py-1 text-xs text-white/80 backdrop-blur transition hover:bg-white/20"
                aria-label="Previous"
              >
                Prev
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-2 py-1 text-xs text-white/80 backdrop-blur transition hover:bg-white/20"
                aria-label="Next"
              >
                Next
              </button>
            )}
            <div className="grid gap-0 md:grid-cols-5">
              <div className="md:col-span-3">
                {content?.videoSrc ? (
                  <div className="relative">
                    {content.poster && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <motion.img
                        layoutId={content.layoutId}
                        src={content.poster}
                        alt={content.title}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                    <motion.video
                      className="relative h-full w-full bg-black object-contain"
                      poster={content.poster}
                      src={content.videoSrc}
                      controls
                      preload="metadata"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    />
                  </div>
                ) : (
                  content?.poster && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <motion.img
                      layoutId={content.layoutId}
                      src={content.poster}
                      alt={content.title}
                      className="h-full w-full object-cover"
                    />
                  )
                )}
              </div>
              <div className="space-y-3 p-5 md:col-span-2">
                <h3 className="text-lg font-semibold">{content?.title}</h3>
                {content?.description && (
                  <p className="text-sm text-muted-foreground">{content.description}</p>
                )}
                {content?.externalHref && (
                  <a
                    href={content.externalHref}
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:brightness-110"
                  >
                    View on Instagram
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
