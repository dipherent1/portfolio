import type React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,173,0.3)]",
        className,
      )}
    >
      {children}
    </div>
  )
}

