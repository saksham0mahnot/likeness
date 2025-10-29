"use client";

import useScrollSpy from "@/hooks/use-scroll-spy";
import Link from "next/link";

const sections = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#reels", id: "reels", label: "Reels" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#about", id: "about", label: "About" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function SectionIndex() {
  const activeId = useScrollSpy(sections.map((s) => s.id), 140);
  return (
    <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
      <nav className="flex flex-col items-end gap-2">
        {sections.map((s) => {
          const active = activeId === s.id;
          return (
            <Link key={s.id} href={s.href} className="group flex items-center gap-2">
              <span className={`text-xs opacity-0 transition-opacity group-hover:opacity-100 ${active ? "opacity-100 text-primary" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              <span className={`block h-2 w-2 rounded-full transition-all ${active ? "h-3 w-3 bg-primary shadow-[0_0_0_6px_rgba(34,211,238,0.15)]" : "bg-foreground/30 group-hover:bg-foreground/60"}`} />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
