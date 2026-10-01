import type React from "react"
import "@/app/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata = {
  title: "Binyam Mulat Abegaz | Fullstack Developer & Mechatronics Engineer",
  description:
    "Portfolio of Binyam Mulat Abegaz — fullstack developer and mechatronics engineer with expertise in Golang, FastAPI, Django, Laravel, and AI.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          jetbrainsMono.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}