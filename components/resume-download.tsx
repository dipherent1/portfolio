"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Eye, Code, Server, Database, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GlassCard from '@/components/ui/glass-card'

export default function ResumeDownload() {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <GlassCard 
      className="relative overflow-hidden transition-all duration-300 hover:border-terminal-green/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-terminal-green mr-3" />
            <h3 className="text-xl font-bold text-terminal-green">My Resume</h3>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
              asChild
            >
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4 mr-2" />
                View
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
              asChild
            >
              <a href="/resume.pdf" download="Binyam_Mulat_Resume.pdf">
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
            <h4 className="flex items-center text-terminal-green font-medium mb-2">
              <Code className="h-4 w-4 mr-2" />
              Frontend
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
            </ul>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
            <h4 className="flex items-center text-terminal-green font-medium mb-2">
              <Server className="h-4 w-4 mr-2" />
              Backend
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Node.js / Express</li>
              <li>Python / Django</li>
              <li>RESTful APIs</li>
              <li>GraphQL</li>
            </ul>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-white/10">
            <h4 className="flex items-center text-terminal-green font-medium mb-2">
              <Cpu className="h-4 w-4 mr-2" />
              Mechatronics
            </h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Embedded Systems</li>
              <li>Arduino / Raspberry Pi</li>
              <li>IoT Development</li>
              <li>Sensor Integration</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-terminal-green/5 to-blue-500/5 -z-10"
        animate={{
          x: isHovered ? ['0%', '100%', '0%'] : '0%',
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </GlassCard>
  )
}
