"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-10">
      <div className="mx-auto max-w-2xl px-4">
        <motion.form initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              placeholder="Your name"
              required
              className="transition-shadow shadow-[0_0_0_0_rgba(34,211,238,0.2)] focus:shadow-[0_0_0_8px_rgba(34,211,238,0.08)]"
            />
            <Input
              placeholder="Email"
              type="email"
              required
              className="transition-shadow shadow-[0_0_0_0_rgba(34,211,238,0.2)] focus:shadow-[0_0_0_8px_rgba(34,211,238,0.08)]"
            />
          </div>
          <Input
            placeholder="Subject"
            className="transition-shadow shadow-[0_0_0_0_rgba(34,211,238,0.2)] focus:shadow-[0_0_0_8px_rgba(34,211,238,0.08)]"
          />
          <Textarea
            placeholder="Tell me about your project..."
            rows={5}
            className="transition-shadow shadow-[0_0_0_0_rgba(34,211,238,0.2)] focus:shadow-[0_0_0_8px_rgba(34,211,238,0.08)]"
          />
          <div className="flex items-center justify-between">
            <a href="mailto:someone@example.com" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <Mail className="mr-2 h-4 w-4" /> or email directly
            </a>
            <Button type="submit"><Send className="mr-2 h-4 w-4" /> Send</Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
