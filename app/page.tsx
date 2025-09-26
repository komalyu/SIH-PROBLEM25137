"use client"
import { useRouter } from "next/navigation"
import { SearchForm } from "@/components/search-form"
import { Bus, MapPin, Heart, Zap } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  const handleSearch = (from: string, to: string) => {
    const params = new URLSearchParams()
    if (from) params.set("from", from)
    if (to) params.set("to", to)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-glow">
              <Zap className="w-4 h-4" />
              Live Tracking Available
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Find Your</span>
              <br />
              <span className="text-foreground">Perfect Bus</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Track buses in real-time, save your favorite routes, and never miss your ride again
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <div className="mobile-card animate-float" style={{ animationDelay: "0.5s" }}>
              <SearchForm onSearch={handleSearch} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="mobile-card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <Bus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
              <p className="text-muted-foreground">See exactly where your bus is in real-time</p>
            </div>

            <div className="mobile-card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
              <p className="text-muted-foreground">Quick access to your most used routes</p>
            </div>

            <div className="mobile-card text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Routes</h3>
              <p className="text-muted-foreground">Find the fastest route to your destination</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
