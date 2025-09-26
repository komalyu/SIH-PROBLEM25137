"use client"

import { useState, useEffect } from "react"
import type { BusRoute } from "@/lib/dummy-data"
import { dummyRoutes } from "@/lib/dummy-data"

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load favorites from localStorage on mount
    const savedFavorites = localStorage.getItem("bus-favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error loading favorites:", error)
        setFavorites([])
      }
    }
    setIsLoaded(true)
  }, [])

  const toggleFavorite = (routeId: string) => {
    const newFavorites = favorites.includes(routeId)
      ? favorites.filter((id) => id !== routeId)
      : [...favorites, routeId]

    setFavorites(newFavorites)
    localStorage.setItem("bus-favorites", JSON.stringify(newFavorites))
  }

  const removeFavorite = (routeId: string) => {
    const newFavorites = favorites.filter((id) => id !== routeId)
    setFavorites(newFavorites)
    localStorage.setItem("bus-favorites", JSON.stringify(newFavorites))
  }

  const isFavorite = (routeId: string) => favorites.includes(routeId)

  const getFavoriteRoutes = (): BusRoute[] => {
    return dummyRoutes.filter((route) => favorites.includes(route.id))
  }

  const clearAllFavorites = () => {
    setFavorites([])
    localStorage.removeItem("bus-favorites")
  }

  return {
    favorites,
    isLoaded,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    getFavoriteRoutes,
    clearAllFavorites,
  }
}
