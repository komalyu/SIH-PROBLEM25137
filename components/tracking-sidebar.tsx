"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Navigation, Gauge, Heart } from "lucide-react"
import type { BusRoute } from "@/lib/dummy-data"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"

interface BusPosition {
  lat: number
  lng: number
  heading: number
}

interface TrackingSidebarProps {
  route: BusRoute
  currentPosition?: BusPosition
  nextStop: string
  estimatedArrival: string
  speed: number
  distance: string
}

export function TrackingSidebar({
  route,
  currentPosition,
  nextStop,
  estimatedArrival,
  speed,
  distance,
}: TrackingSidebarProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { toast } = useToast()

  const handleToggleFavorite = () => {
    const wasAlreadyFavorite = isFavorite(route.id)
    toggleFavorite(route.id)

    toast({
      title: wasAlreadyFavorite ? "Removed from favorites" : "Added to favorites",
      description: wasAlreadyFavorite
        ? "The route has been removed from your favorites."
        : "The route has been added to your favorites.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "early":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      {/* Bus Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">
                {route.busName} #{route.busNumber}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {route.from} → {route.to}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className={`p-2 ${isFavorite(route.id) ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Heart className={`h-5 w-5 ${isFavorite(route.id) ? "fill-current" : ""}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Scheduled</span>
            <span className="text-sm font-medium">
              {route.departureTime} - {route.arrivalTime}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Fare</span>
            <span className="text-sm font-medium">${route.fare}</span>
          </div>
        </CardContent>
      </Card>

      {/* Live Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Live Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Next Stop</span>
            <span className="text-sm font-medium">{nextStop}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">ETA</span>
            <span className="text-sm font-medium">{estimatedArrival}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Distance</span>
            <span className="text-sm font-medium">{distance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              Speed
            </span>
            <span className="text-sm font-medium">{speed} mph</span>
          </div>
        </CardContent>
      </Card>

      {/* GPS Coordinates (Optional) */}
      {currentPosition && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">GPS Position</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Latitude</span>
              <span className="text-sm font-mono">{currentPosition.lat.toFixed(6)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Longitude</span>
              <span className="text-sm font-mono">{currentPosition.lng.toFixed(6)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Heading</span>
              <span className="text-sm font-mono">{Math.round(currentPosition.heading)}°</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Clock className="h-3 w-3" />
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}
