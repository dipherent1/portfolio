"use client";

import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/data";

export default function Contact() {
  const [state, handleSubmit] = useForm("xpwporvg");

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold gradient-text">Get in Touch</h2>
        <p className="text-muted-foreground mt-2 mb-12">
          Have a project in mind or want to connect? Feel free to reach out.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="bg-secondary border-border"
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-destructive text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="bg-secondary border-border"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-destructive text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Your message..."
                  className="bg-secondary border-border"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-destructive text-sm mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="mr-2 h-4 w-4" />
                {state.submitting ? "Sending..." : "Send Message"}
              </Button>

              {state.succeeded && (
                <p className="text-primary text-sm mt-3 text-center">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I&apos;m always open to discussing new opportunities, creative
                collaborations, or questions about my work. Reach out through
                the form or connect with me directly via email or social platforms.
              </p>

              <div className="space-y-2">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <Mail className="h-5 w-5 text-primary shrink-0" />
                  <span className="truncate">{siteConfig.email}</span>
                </a>

                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <Github className="h-5 w-5 text-primary shrink-0" />
                  <span className="truncate">{siteConfig.github}</span>
                </a>

                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  <Linkedin className="h-5 w-5 text-primary shrink-0" />
                  <span className="truncate">{siteConfig.linkedin}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
