"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
          <span className="block">Hi, I&apos;m</span>
          <span className="block gradient-text mt-3 pb-2 leading-tight">{siteConfig.name}</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mt-6 font-medium">
          {siteConfig.title}
        </p>

        <p className="text-muted-foreground max-w-lg mt-6 leading-relaxed">
          {siteConfig.heroTagline}
        </p>

        {/* Buttons row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => handleScrollTo("projects")}
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            onClick={() => handleScrollTo("contact")}
          >
            Get in Touch
          </Button>
        </div>

        {/* Social icons row */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground"
            asChild
          >
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground"
            asChild
          >
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
