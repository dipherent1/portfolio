"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    
    const mouseDown = () => setCursorVariant('click')
    const mouseUp = () => setCursorVariant('default')
    
    const handleLinkHover = () => setCursorVariant('hover')
    const handleLinkLeave = () => setCursorVariant('default')
    
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)
    
    // Add event listeners to all links and buttons
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover)
      el.addEventListener('mouseleave', handleLinkLeave)
    })
    
    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover)
        el.removeEventListener('mouseleave', handleLinkLeave)
      })
    }
  }, [])
  
  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: 'rgba(0, 255, 0, 0.5)',
      mixBlendMode: 'difference' as const,
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(0, 255, 0, 0.8)',
      mixBlendMode: 'difference' as const,
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    click: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(0, 255, 0, 1)',
      mixBlendMode: 'difference' as const,
      transition: {
        type: 'spring',
        mass: 0.6
      }
    }
  }
  
  // Only show on desktop
  const [isDesktop, setIsDesktop] = useState(false)
  
  useEffect(() => {
    setIsDesktop(window.innerWidth > 768)
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  if (!isDesktop) return null
  
  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={variants}
      animate={cursorVariant}
    />
  )
}
