"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BusCard } from "@/components/bus-card"
import { SearchFilters, type FilterOptions } from "@/components/search-filters"
import { SearchForm } from "@/components/search-form"
import { type BusRoute, searchRoutes, dummyRoutes } from "@/lib/dummy-data"
import { useFavorites } from "@/hooks/use-favorites"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [routes, setRoutes] = useState<BusRoute[]>([])
  const [filteredRoutes, setFilteredRoutes] = useState<BusRoute[]>([])
  const { toggleFavorite, isFavorite } = useFavorites()
  const { toast } = useToast()
  const [filters, setFilters] = useState<FilterOptions>({
    maxFare: 50,
    maxDuration: 120,
    departureTime: "any",
    sortBy: "departure",
  })

  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""

  useEffect(() => {
    // Perform search
    const results = from || to ? searchRoutes(from, to) : dummyRoutes
    setRoutes(results)
  }, [from, to])

  useEffect(() => {
    // Apply filters and sorting
    const filtered = routes.filter((route) => {
      const fareMatch = route.fare <= filters.maxFare
      const durationMatch = Number.parseInt(route.duration) <= filters.maxDuration

      let timeMatch = true
      if (filters.departureTime !== "any") {
        const hour = Number.parseInt(route.departureTime.split(":")[0])
        const isPM = route.departureTime.includes("PM")
        const hour24 = isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour

        switch (filters.departureTime) {
          case "morning":
            timeMatch = hour24 >= 6 && hour24 < 12
            break
          case "afternoon":
            timeMatch = hour24 >= 12 && hour24 < 18
            break
          case "evening":
            timeMatch = hour24 >= 18 || hour24 < 6
            break
        }
      }

      return fareMatch && durationMatch && timeMatch
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "fare":
          return a.fare - b.fare
        case "duration":
          return Number.parseInt(a.duration) - Number.parseInt(b.duration)
        case "status":
          const statusOrder = { "on-time": 0, early: 1, delayed: 2 }
          return statusOrder[a.status] - statusOrder[b.status]
        default: // departure
          return a.departureTime.localeCompare(b.departureTime)
      }
    })

    setFilteredRoutes(filtered)
  }, [routes, filters])

  const handleSearch = (newFrom: string, newTo: string) => {
    const results = searchRoutes(newFrom, newTo)
    setRoutes(results)
  }

  const handleToggleFavorite = (routeId: string) => {
    const wasAlreadyFavorite = isFavorite(routeId)
    toggleFavorite(routeId)

    toast({
      title: wasAlreadyFavorite ? "Removed from favorites" : "Added to favorites",
      description: wasAlreadyFavorite
        ? "The route has been removed from your favorites."
        : "The route has been added to your favorites.",
    })
  }

  const clearFilters = () => {
    setFilters({
      maxFare: 50,
      maxDuration: 120,
      departureTime: "any",
      sortBy: "departure",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bus Search Results</h1>
          {(from || to) && <p className="text-muted-foreground">{from && to ? `${from} → ${to}` : from || to}</p>}
        </div>
      </div>

      {/* New Search Form */}
      <div className="bg-card rounded-lg border border-border p-4 mb-6">
        <SearchForm onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <SearchFilters filters={filters} onFiltersChange={setFilters} onClearFilters={clearFilters} />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="mb-4">
            <p className="text-muted-foreground">
              Showing {filteredRoutes.length} of {routes.length} results
            </p>
          </div>

          {filteredRoutes.length > 0 ? (
            <div className="grid gap-4">
              {filteredRoutes.map((route) => (
                <BusCard
                  key={route.id}
                  route={route}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite(route.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No buses found matching your criteria</p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
