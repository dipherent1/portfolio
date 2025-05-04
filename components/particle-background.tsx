"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }
    
    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: '#00FF00',
          alpha: Math.random() * 0.5 + 0.1
        })
      }
    }
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.alpha
        ctx.fill()
        
        // Draw connections
        connectParticles(particle, index)
      })
      
      animationFrameRef.current = requestAnimationFrame(drawParticles)
    }
    
    const connectParticles = (particle: Particle, index: number) => {
      const connectionDistance = 150
      
      for (let i = index + 1; i < particlesRef.current.length; i++) {
        const otherParticle = particlesRef.current[i]
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < connectionDistance) {
          const alpha = 1 - (distance / connectionDistance)
          ctx.beginPath()
          ctx.strokeStyle = particle.color
          ctx.globalAlpha = alpha * 0.2
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      }
    }
    
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    drawParticles()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  )
}
