"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Bus, Sparkles } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Bus className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-8 w-8 text-primary/30 animate-ping"></div>
              </div>
              <span className="font-bold text-xl gradient-text">BusTracker</span>
              <Sparkles className="h-4 w-4 text-primary/60 animate-pulse" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className="text-foreground hover:text-primary transition-all duration-300 font-medium hover:scale-105"
            >
              Favorites
            </Link>
            <Link href="/driver-login" className="mobile-button text-sm py-2 px-4">
              Driver Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:bg-primary/20 rounded-xl p-3"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-4 pb-6 space-y-3 border-t border-border/50 bg-card/50 backdrop-blur-sm rounded-b-2xl">
              <Link
                href="/"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-xl font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/favorites"
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-xl font-medium"
                onClick={() => setIsOpen(false)}
              >
                Favorites
              </Link>
              <Link
                href="/driver-login"
                className="block px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-center hover:bg-primary/90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Driver Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
