"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightLeft, Search, MapPin, Zap } from "lucide-react"
import { cities, busStops } from "@/lib/dummy-data"

interface SearchFormProps {
  onSearch: (from: string, to: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([])
  const [toSuggestions, setToSuggestions] = useState<string[]>([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)

  const allLocations = [...cities, ...busStops]

  const handleFromChange = (value: string) => {
    setFrom(value)
    if (value.length > 0) {
      const filtered = allLocations
        .filter((location) => location.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
      setFromSuggestions(filtered)
      setShowFromSuggestions(true)
    } else {
      setShowFromSuggestions(false)
    }
  }

  const handleToChange = (value: string) => {
    setTo(value)
    if (value.length > 0) {
      const filtered = allLocations
        .filter((location) => location.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
      setToSuggestions(filtered)
      setShowToSuggestions(true)
    } else {
      setShowToSuggestions(false)
    }
  }

  const swapLocations = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(from, to)
    setShowFromSuggestions(false)
    setShowToSuggestions(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
          <Zap className="w-3 h-3" />
          Smart Search
        </div>
        <h2 className="text-2xl font-bold text-foreground">Where are you going?</h2>
      </div>

      <div className="space-y-6">
        {/* From Input */}
        <div className="relative">
          <Label htmlFor="from" className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            From
          </Label>
          <Input
            id="from"
            type="text"
            placeholder="Enter departure location"
            value={from}
            onChange={(e) => handleFromChange(e.target.value)}
            onFocus={() => from.length > 0 && setShowFromSuggestions(true)}
            className="h-14 text-lg rounded-xl border-2 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm"
          />
          {showFromSuggestions && fromSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl overflow-hidden">
              {fromSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-primary/10 hover:text-primary transition-all duration-200 border-b border-border/30 last:border-b-0"
                  onClick={() => {
                    setFrom(suggestion)
                    setShowFromSuggestions(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {suggestion}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={swapLocations}
            className="rounded-full w-12 h-12 p-0 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
          >
            <ArrowRightLeft className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {/* To Input */}
        <div className="relative">
          <Label htmlFor="to" className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            To
          </Label>
          <Input
            id="to"
            type="text"
            placeholder="Enter destination"
            value={to}
            onChange={(e) => handleToChange(e.target.value)}
            onFocus={() => to.length > 0 && setShowToSuggestions(true)}
            className="h-14 text-lg rounded-xl border-2 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm"
          />
          {showToSuggestions && toSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl overflow-hidden">
              {toSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-primary/10 hover:text-primary transition-all duration-200 border-b border-border/30 last:border-b-0"
                  onClick={() => {
                    setTo(suggestion)
                    setShowToSuggestions(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {suggestion}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="mobile-button w-full h-14 text-lg animate-glow">
        <Search className="h-6 w-6 mr-3" />
        Find My Bus
      </Button>
    </form>
  )
}
