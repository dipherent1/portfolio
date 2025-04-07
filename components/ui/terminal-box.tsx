import type React from "react"
import { cn } from "@/lib/utils"

interface TerminalBoxProps {
  children: React.ReactNode
  className?: string
  title?: string
  customHeader?: React.ReactNode
}

export default function TerminalBox({
  children,
  className,
  title = "terminal@binyam:~$",
  customHeader,
}: TerminalBoxProps) {
  return (
    <div className={cn("glass-card overflow-hidden", className)}>
      <div className="bg-black/50 px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex space-x-2 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-jetbrains text-sm text-gray-400">{title}</div>
        </div>
        {customHeader}
      </div>
      <div className="p-4 font-jetbrains text-terminal-green h-full">{children}</div>
    </div>
  )
}

