"use client"

import { useState } from "react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronLeft, ChevronRight, Code } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  liveUrl?: string
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "Kesbekes 2.0",
      description:
        "Real-time Telegram Bot with Redis, Go, and AI filtering capabilities for content moderation and user interaction.",
      techStack: ["Go", "Redis", "Telegram API", "AI", "Docker"],
      githubUrl: "https://github.com/dipherent1/Kesbekes-2.0",
    },
    {
      id: 2,
      title: "Smart Bike Rack",
      description:
        "IoT system with ESP32 and Python backend for monitoring and managing bike racks with real-time status updates.",
      techStack: ["ESP32", "Python", "MQTT", "MongoDB", "React"],
      githubUrl: "https://github.com/IETP-Project-Smart-Bike-Rack/Smart-Rack",
      liveUrl: "https://sites.google.com/view/smartbikerack/description",
    },
    {
      id: 3,
      title: "Kesbekes WebApp",
      description:
        "Scheduling application with Natural Language Processing capabilities built with Django and modern frontend technologies.",
      techStack: ["Django", "NLP", "PostgreSQL", "React", "Redux"],
      githubUrl: "https://github.com/dipherent1/Kesbekes",
    },
    {
      id: 4,
      title: "AI Code Assistant",
      description:
        "A tool that helps developers write better code by providing suggestions and identifying potential bugs.",
      techStack: ["Python", "FastAPI", "Machine Learning", "React", "TypeScript"],
      githubUrl: "https://github.com",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const projectsPerPage = 3
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + projectsPerPage >= projects.length ? 0 : prevIndex + projectsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - projectsPerPage < 0 ? Math.max(0, projects.length - projectsPerPage) : prevIndex - projectsPerPage,
    )
  }

  const currentProjects = projects.slice(currentIndex, Math.min(currentIndex + projectsPerPage, projects.length))

  return (
    <Container>
      <SectionHeading title="Projects" subtitle="A showcase of my recent work and technical capabilities" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project) => (
          <GlassCard key={project.id} className="flex flex-col h-full group depth-card">
            <div className="depth-content">
              <div className="flex items-center justify-center h-48 mb-4 bg-gradient-to-br from-deep-blue/30 to-mint-green/30 rounded-md overflow-hidden gradient-animate">
                <Code className="h-16 w-16 text-terminal-green opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-xl font-bold mb-2 gradient-text">{project.title}</h3>
              <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-black/30 border border-white/10 rounded-full text-xs hover:bg-terminal-green/20 hover:border-terminal-green/50 transition-all hover:translate-y-[-2px] inline-block"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10 glitch-hover"
                  data-text="Code"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </a>
                </Button>
                {project.liveUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10 glitch-hover"
                    data-text="Demo"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 hover-glow"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 hover-glow"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </Container>
  )
}

