import Image from "next/image";
import { Github, ExternalLink, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/30 transition-colors flex flex-col h-full">
      {/* Image */}
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            </Button>
          )}
          {project.linkedinUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                Post
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
