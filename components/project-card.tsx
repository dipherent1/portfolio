"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Github, ExternalLink, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GlassCard from '@/components/ui/glass-card'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl?: string
  imageSrc: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  imageSrc
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <GlassCard className="overflow-hidden transition-all duration-300 hover:border-terminal-green/50 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-terminal-green mb-2">{title}</h3>
        
        <p className="text-gray-300 text-sm mb-4">
          {isExpanded ? description : `${description.substring(0, 100)}${description.length > 100 ? '...' : ''}`}
          {description.length > 100 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-terminal-green ml-1 hover:underline focus:outline-none"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-1 text-xs bg-terminal-green/10 text-terminal-green rounded-md border border-terminal-green/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Code
            </a>
          </Button>
          
          {liveUrl && (
            <Button
              variant="outline"
              size="sm"
              className="border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
              asChild
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  )
}
