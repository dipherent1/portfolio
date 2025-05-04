"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/container'
import SectionHeading from '@/components/ui/section-heading'
import GlassCard from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  url: string
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Responsive Web Applications with Next.js',
    excerpt: 'Learn how to create responsive and performant web applications using Next.js and Tailwind CSS.',
    date: 'June 15, 2023',
    readTime: '5 min read',
    image: '/image/blog-1.jpg',
    url: '#',
    tags: ['Next.js', 'React', 'Tailwind CSS']
  },
  {
    id: '2',
    title: 'The Future of Mechatronics in Software Development',
    excerpt: 'Exploring the intersection of mechanical engineering, electronics, and software development.',
    date: 'July 22, 2023',
    readTime: '7 min read',
    image: '/image/blog-2.jpg',
    url: '#',
    tags: ['Mechatronics', 'IoT', 'Embedded Systems']
  },
  {
    id: '3',
    title: 'Creating Interactive User Interfaces with Framer Motion',
    excerpt: 'A deep dive into creating engaging animations and transitions using Framer Motion in React applications.',
    date: 'August 10, 2023',
    readTime: '6 min read',
    image: '/image/blog-3.jpg',
    url: '#',
    tags: ['React', 'Animation', 'Framer Motion']
  }
]

export default function BlogPreview() {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)
  
  return (
    <section id="blog" className="py-20">
      <Container>
        <SectionHeading>Latest Articles</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {blogPosts.map((post) => (
            <GlassCard
              key={post.id}
              className={`overflow-hidden transition-all duration-300 ${
                hoveredPost === post.id ? 'border-terminal-green/50' : 'border-white/10'
              }`}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredPost === post.id ? 'scale-105' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 text-xs bg-terminal-green/10 text-terminal-green rounded-md border border-terminal-green/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-400 mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-3 w-3 mr-1 text-terminal-green/70" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-terminal-green/70" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-terminal-green mb-2">{post.title}</h3>
                
                <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10 w-full"
                  asChild
                >
                  <a href={post.url}>
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="border-terminal-green/30 text-terminal-green hover:bg-terminal-green/10"
            asChild
          >
            <a href="/blog">
              View All Articles
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
