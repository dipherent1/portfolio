"use client"

import type React from "react"

import { useState } from "react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send, AlertCircle, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage("")

    try {
      // Create form data object
      const formData = new FormData()

      // Add form fields
      formData.append('access_key', '76ee15c6-1b3e-4af1-bf74-56d6df04a38a')
      formData.append('name', formState.name)
      formData.append('email', formState.email)
      formData.append('subject', formState.subject || 'New contact form submission')
      formData.append('message', formState.message)
      formData.append('from_name', 'Portfolio Contact Form')

      // Send the form data to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        // Form submission was successful
        setSubmitStatus('success')
        setSubmitMessage("Message sent successfully! I'll get back to you soon.")

        // Reset the form
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Clear success message after 8 seconds
        setTimeout(() => {
          setSubmitStatus(null)
          setSubmitMessage("")
        }, 8000)
      } else {
        // Form submission failed
        setSubmitStatus('error')
        setSubmitMessage(data.message || "Something went wrong. Please try again.")
        console.error('Form submission failed:', data)
      }
    } catch (error) {
      // Handle any errors
      setSubmitStatus('error')
      setSubmitMessage("An error occurred. Please try again later.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <SectionHeading title="Contact" subtitle="Get in touch with me for collaborations or opportunities" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <GlassCard>
          <h3 className="text-xl font-bold mb-6 text-terminal-green">Send a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border-white/10 focus:border-terminal-green focus:ring-terminal-green/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full bg-black/30 border-white/10 focus:border-terminal-green focus:ring-terminal-green/20"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                Subject (optional)
              </label>
              <Input
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                className="w-full bg-black/30 border-white/10 focus:border-terminal-green focus:ring-terminal-green/20"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-black/30 border-white/10 focus:border-terminal-green focus:ring-terminal-green/20"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-terminal-green text-black hover:bg-terminal-green/80 transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </span>
              )}
            </Button>

            {submitStatus === 'success' && submitMessage && (
              <div className="text-terminal-green text-center flex items-center justify-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                {submitMessage}
              </div>
            )}

            {submitStatus === 'error' && submitMessage && (
              <div className="text-red-400 text-center flex items-center justify-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {submitMessage}
              </div>
            )}

            {/* Hidden honeypot field to prevent spam */}
            <div className="hidden">
              <input type="checkbox" name="botcheck" id="botcheck" className="hidden" />
            </div>
          </form>
        </GlassCard>

        <GlassCard className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-6 text-terminal-green">Connect With Me</h3>

            <p className="text-gray-300 mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:binyammulat244@gmail.com"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors"
              >
                <Mail className="h-5 w-5 mr-3" />
                <span>binyammulat244@gmail.com</span>
              </a>

              <a
                href="https://github.com/dipherent1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors group"
              >
                <Github className="h-5 w-5 mr-3" />
                <span>github.com/dipherent1</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs terminal-text">
                  $ git clone https://github.com/dipherent1
                </span>
              </a>

              <a
                href="https://linkedin.com/in/binyam-mulat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-terminal-green transition-colors group"
              >
                <Linkedin className="h-5 w-5 mr-3" />
                <span>linkedin.com/in/binyam-mulat</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs terminal-text">
                  $ open connection
                </span>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-center text-gray-400">
              &copy; {new Date().getFullYear()} Binyam Mulat Abegaz. All rights reserved.
            </p>
          </div>
        </GlassCard>
      </div>
    </Container>
  )
}

