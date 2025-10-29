"use client";

import Link from "next/link";
import { Instagram, Mail, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import useScrollSpy from "@/hooks/use-scroll-spy";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/theme-toggle";
import Magnetic from "@/components/magnetic";

export default function Navbar() {
  const sections = [
    { href: "#work", label: "Work", id: "work" },
    { href: "#reels", label: "Reels", id: "reels" },
    { href: "#services", label: "Services", id: "services" },
    { href: "#about", label: "About", id: "about" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];
  const activeId = useScrollSpy(sections.map((s) => s.id), 120);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-black/50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="#" className="text-xl font-semibold tracking-tight">
          likeness
        </Link>
        <nav className="hidden gap-6 md:flex">
          {sections.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Magnetic key={item.href}>
                <Link href={item.href} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </Magnetic>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon">
                  <a href="https://www.instagram.com/likeness.0/" target="_blank" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Instagram</TooltipContent>
            </Tooltip>
            <ThemeToggle />
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="[perspective:800px]">
                  <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      asChild
                      size="sm"
                      className="shadow-[0_0_0_0_rgba(34,211,238,0.35)] transition-shadow hover:shadow-[0_0_0_8px_rgba(34,211,238,0.18)]"
                    >
                      <a href="#contact">
                        <Mail className="mr-2 h-4 w-4" /> Hire me
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Hire me</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="mt-8 flex flex-col gap-1">
                {sections.map((item, i) => (
                  <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={item.href} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
