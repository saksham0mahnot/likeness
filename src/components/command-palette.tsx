"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Instagram, Mail, Search } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if ((isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (hash: string) => {
    setOpen(false);
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <Command>
          <CommandInput placeholder="Search sections, actions... (Cmd/Ctrl + K)" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigate">
              <CommandItem onSelect={() => go("#work")}>
                <Search className="mr-2 h-4 w-4" />
                <span>Go to Work</span>
              </CommandItem>
              <CommandItem onSelect={() => go("#reels")}>
                <Search className="mr-2 h-4 w-4" />
                <span>Go to Reels</span>
              </CommandItem>
              <CommandItem onSelect={() => go("#services")}>
                <Search className="mr-2 h-4 w-4" />
                <span>Go to Services</span>
              </CommandItem>
              <CommandItem onSelect={() => go("#about")}>
                <Search className="mr-2 h-4 w-4" />
                <span>Go to About</span>
              </CommandItem>
              <CommandItem onSelect={() => go("#contact")}>
                <Search className="mr-2 h-4 w-4" />
                <span>Go to Contact</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => (window.location.href = "mailto:someone@example.com") }>
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </CommandItem>
              <CommandItem onSelect={() => window.open("https://www.instagram.com/likeness.0/", "_blank") }>
                <Instagram className="mr-2 h-4 w-4" />
                <span>Open Instagram</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
