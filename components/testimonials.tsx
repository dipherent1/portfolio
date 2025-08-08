"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Container from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'
import GlassCard from '@/components/ui/glass-card'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Project Manager",
    company: "TechCorp",
    content: "Binyam is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Lead Developer",
    company: "InnovateTech",
    content: "Working with Binyam was a pleasure. His technical expertise and ability to understand complex requirements made our project a success.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CTO",
    company: "StartupX",
    content: "Binyam's mechatronics background brings a unique perspective to software development. He created innovative solutions that exceeded our expectations.",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  
  useEffect(() => {
    if (!autoplay) return
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoplay])
  
  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }
  
  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  return (
    <section id="testimonials" className="py-20">
      <Container>
        <SectionHeading>Testimonials</SectionHeading>
        
        <div className="relative mt-12 max-w-4xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <GlassCard className="p-8 relative">
                <Quote className="absolute top-6 left-6 h-8 w-8 text-terminal-green/20" />
                
                <div className="text-center">
                  <p className="text-gray-300 italic mb-6 relative z-10">"{testimonials[current].content}"</p>
                  
                  <div className="mt-4">
                    <h4 className="text-terminal-green font-bold">{testimonials[current].name}</h4>
                    <p className="text-sm text-gray-400">
                      {testimonials[current].role} at {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-terminal-green w-6' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 text-terminal-green p-2 rounded-full border border-terminal-green/30 hover:bg-terminal-green/10 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-black/50 text-terminal-green p-2 rounded-full border border-terminal-green/30 hover:bg-terminal-green/10 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </section>
  )
}
