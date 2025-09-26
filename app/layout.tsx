import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BusTracker - Live Bus Tracking",
  description: "Track buses in real-time, save favorite routes, and manage your commute",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
