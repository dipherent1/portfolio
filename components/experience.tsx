"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { experiences, type Experience } from "@/lib/data";

const ITEMS_PER_PAGE = 3;

export default function Experience() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(experiences.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentExperiences = experiences.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div>
        <h2 className="text-3xl font-bold gradient-text">Experience</h2>
        <p className="text-muted-foreground mt-2 mb-12">
          My professional journey and achievements
        </p>
      </div>

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-12">
          {currentExperiences.map((exp: Experience, index: number) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-card border-2 border-border flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>

              {/* Content card */}
              <div className="bg-card border border-border rounded-xl p-6">
                {/* Title row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {exp.period}
                  </span>
                </div>

                {/* Company + location */}
                <div className="text-sm mt-1">
                  <span className="text-primary font-medium">{exp.company}</span>
                  {exp.location && (
                    <span className="text-muted-foreground"> • {exp.location}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mt-3">{exp.description}</p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc pl-4 text-sm text-muted-foreground mt-3 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}

                {/* Tech tags */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link (if exists) */}
                {exp.link && (
                  <div className="mt-4">
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                    >
                      <span>Visit website</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

