"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const sectionId = item.href.replace(/^#/, "");
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      } else if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 50
      ) {
        const lastItem = navItems[navItems.length - 1];
        if (lastItem) {
          setActiveSection(lastItem.href.replace(/^#/, ""));
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace(/^#/, "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#"
          onClick={handleLogoClick}
          className="font-mono text-sm font-semibold text-foreground tracking-tight"
        >
          Binyam Mulat
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace(/^#/, "");
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={cn(
                  "text-sm transition-colors hover:text-foreground",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            );
          })}
          <Button variant="outline" size="sm" asChild>
            <a
              href={siteConfig.resumePath}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </Button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace(/^#/, "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "text-sm transition-colors hover:text-foreground py-1",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </a>
              );
            })}
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a
                  href={siteConfig.resumePath}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
