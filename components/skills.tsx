"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4"
    >
      <h2 className="text-3xl font-bold gradient-text">Skills</h2>
      <p className="text-muted-foreground mt-2 mb-12">
        My technical toolkit and areas of expertise
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((category) => (
          <div
            key={category.title}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
