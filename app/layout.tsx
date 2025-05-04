import type React from "react"
import "@/app/globals.css"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
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
  title: "Binyam Mulat Abegaz | Backend Developer & Mechatronics Enthusiast",
  description:
    "Portfolio of Binyam Mulat Abegaz, a backend developer and mechatronics enthusiast with expertise in Golang, FastAPI, Django, and AI.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-off-black font-sans antialiased", inter.variable, jetbrainsMono.variable)} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



// Import already handled at the top