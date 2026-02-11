"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Adjust these values to fine-tune when a section becomes "active"
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    const sections = navItems.map((item) => item.href.substring(1));
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300 backdrop-blur-md bg-black/40 border-b border-white/10",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="#home"
              className="font-jetbrains text-xl font-bold text-terminal-green"
              onClick={() => handleNavClick("#home")}
            >
              <span className="terminal-text">binyam@portfolio</span>
              <span className="text-white">:~$</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "font-jetbrains px-3 py-2 rounded-md text-sm transition-colors",
                    activeSection === item.href.substring(1)
                      ? "text-terminal-green"
                      : "text-gray-300 hover:text-terminal-green",
                  )}
                >
                  {item.name}
                </a>
              ))}
              <Button
                variant="outline"
                className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
                asChild
              >
                <a href="/files/resume.pdf" download="Binyam_Mulat_Resume.pdf">
                  Resume
                </a>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-card m-2 rounded-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "font-jetbrains block px-3 py-2 rounded-md text-base",
                  activeSection === item.href.substring(1)
                    ? "text-terminal-green"
                    : "text-gray-300 hover:text-terminal-green",
                )}
              >
                {item.name}
              </a>
            ))}
            <Button
              variant="outline"
              className="w-full mt-2 border-terminal-green text-terminal-green hover:bg-terminal-green/10"
              asChild
            >
              <a href="/files/resume.pdf" download="Binyam_Mulat_Resume.pdf">
                Resume
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
