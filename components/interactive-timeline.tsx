"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, MapPin, Briefcase } from 'lucide-react'

interface TimelineItem {
  id: string
  title: string
  company: string
  location: string
  date: string
  description: string[]
  technologies?: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function InteractiveTimeline({ items }: TimelineProps) {
  const [activeItem, setActiveItem] = useState<string>(items[0]?.id || '')
  
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terminal-green/80 via-terminal-green/50 to-terminal-green/10" />
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineEntry 
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

interface TimelineEntryProps {
  item: TimelineItem
  isActive: boolean
  onClick: () => void
  index: number
}

function TimelineEntry({ item, isActive, onClick, index }: TimelineEntryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-10"
    >
      {/* Timeline dot */}
      <div 
        className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          isActive 
            ? 'border-terminal-green bg-terminal-green/20 text-terminal-green' 
            : 'border-gray-600 bg-black/50 text-gray-400'
        }`}
        style={{ top: '0.25rem' }}
      >
        <Briefcase className="h-4 w-4" />
      </div>
      
      <div 
        onClick={onClick}
        className={`cursor-pointer transition-all duration-300 p-5 rounded-lg ${
          isActive 
            ? 'bg-black/40 border border-terminal-green/30' 
            : 'bg-black/20 border border-white/5 hover:bg-black/30'
        }`}
      >
        <h3 className={`text-xl font-bold transition-colors duration-300 ${
          isActive ? 'text-terminal-green' : 'text-gray-300'
        }`}>
          {item.title}
        </h3>
        
        <h4 className="text-gray-300 font-medium mt-1">{item.company}</h4>
        
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-terminal-green/70" />
            {item.date}
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-terminal-green/70" />
            {item.location}
          </div>
        </div>
        
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-hidden"
          >
            <ul className="space-y-2 text-gray-300 list-disc pl-5">
              {item.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            
            {item.technologies && (
              <div className="mt-4">
                <div className="text-sm text-gray-400 mb-2">Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 text-xs bg-terminal-green/10 text-terminal-green rounded-md border border-terminal-green/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
