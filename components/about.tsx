"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, stats, education } from "@/lib/data";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4"
    >
      <h2 className="text-3xl font-bold gradient-text">About Me</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Left Column: Profile Image & Resume */}
        <div>
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border">
            <Image
              src="/image/sho.jpg"
              alt={siteConfig.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-6">
            <Button asChild variant="outline">
              <a
                href={siteConfig.resumePath}
                download="Binyam_Mulat_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Right Column: Bio Paragraphs */}
        <div className="flex flex-col justify-center">
          {siteConfig.about.map((paragraph, index) => (
            <p
              key={index}
              className="text-muted-foreground leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-xl p-6 text-center"
          >
            <div className="text-3xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold gradient-text mb-8">Education</h3>
        <div>
          {education.map((item, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 mb-4"
            >
              <div className="text-lg font-semibold text-foreground">
                {item.degree}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {item.school} • {item.period}
              </div>
              <p className="text-muted-foreground mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
