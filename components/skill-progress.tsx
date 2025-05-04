"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SkillProgressProps {
  name: string
  level: number // 0-100
  color?: string
}

export default function SkillProgress({ 
  name, 
  level, 
  color = '#00FF00' 
}: SkillProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{name}</span>
        <span className="text-xs text-terminal-green">{level}%</span>
      </div>
      
      <div className="h-2 bg-black/30 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
