"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, ChevronRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageSrc: string;
  linkedinUrl?: string;
}

const ProjectImage = ({ src, title }: { src: string; title: string }) => (
  <div className="relative h-48 mb-4 rounded-md overflow-hidden shrink-0">
    {src ? (
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    ) : (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-deep-blue/30 to-mint-green/30 gradient-animate">
        {/* Placeholder if needed */}
      </div>
    )}
  </div>
);

const ProjectTitle = ({ title }: { title: string }) => (
  <h3 className="text-xl font-bold mb-2 gradient-text min-h-[3.5rem] line-clamp-2">
    {title}
  </h3>
);

const ProjectDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = description.length > 200;

  return (
    <div className="flex-grow">
      <p className="text-gray-300 mb-4 text-sm">
        {isExpanded
          ? description
          : `${description.substring(0, 200)}${shouldTruncate ? "..." : ""}`}
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-terminal-green ml-1 hover:underline focus:outline-none"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
    </div>
  );
};

const ProjectTags = ({ technologies }: { technologies: string[] }) => (
  <div className="mb-4 overflow-x-auto py-2 px-1 custom-scrollbar">
    <div className="flex flex-nowrap gap-2">
      {technologies.map((tech) => (
        <span
          key={tech}
          className="px-2 py-1 bg-black/30 border border-white/10 rounded-full text-xs hover:bg-terminal-green/20 hover:border-terminal-green/50 transition-all hover:translate-y-[-2px] whitespace-nowrap"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const ProjectLinks = ({
  githubUrl,
  liveUrl,
  linkedinUrl,
}: {
  githubUrl: string;
  liveUrl?: string;
  linkedinUrl?: string;
}) => (
  <div className="flex gap-2 mt-auto">
    <Button
      size="sm"
      variant="outline"
      className="flex-1 border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10 glitch-hover"
      data-text="Code"
      asChild
    >
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <Github className="h-4 w-4 mr-1" />
        Code
      </a>
    </Button>
    {liveUrl && (
      <Button
        size="sm"
        variant="outline"
        className="flex-1 border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10 glitch-hover"
        data-text="Demo"
        asChild
      >
        <a href={liveUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4 mr-1" />
          Demo
        </a>
      </Button>
    )}
    {linkedinUrl && (
      <Button
        size="sm"
        variant="outline"
        className="flex-1 border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10 glitch-hover"
        data-text="Post"
        asChild
      >
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4 mr-1" />
          Post
        </a>
      </Button>
    )}
  </div>
);

export default function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  imageSrc,
  linkedinUrl,
}: ProjectCardProps) {
  return (
    <GlassCard className="flex flex-col h-full group depth-card">
      <div className="depth-content h-full flex flex-col">
        <ProjectImage src={imageSrc} title={title} />
        <ProjectTitle title={title} />
        <ProjectDescription description={description} />
        <div className="mt-auto">
          <ProjectTags technologies={technologies} />
          <ProjectLinks
            githubUrl={githubUrl}
            liveUrl={liveUrl}
            linkedinUrl={linkedinUrl}
          />
        </div>
      </div>
    </GlassCard>
  );
}
