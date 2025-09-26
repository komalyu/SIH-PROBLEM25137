"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, DollarSign, Trash2, Navigation } from "lucide-react"
import type { BusRoute } from "@/lib/dummy-data"
import Link from "next/link"

interface FavoriteRouteCardProps {
  route: BusRoute
  onRemove: (routeId: string) => void
}

export function FavoriteRouteCard({ route, onRemove }: FavoriteRouteCardProps) {
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
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {route.busName} #{route.busNumber}
            </h3>
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
            onClick={() => onRemove(route.id)}
            className="text-muted-foreground hover:text-red-500 p-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Timing and Status */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {route.departureTime} - {route.arrivalTime}
            </span>
          </div>
          <Badge className={getStatusColor(route.status)}>{route.status}</Badge>
        </div>

        {/* Fare and Duration */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-lg font-semibold text-foreground">${route.fare}</span>
          </div>
          <span className="text-sm text-muted-foreground">Duration: {route.duration}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link href={`/track/${route.id}`} className="flex-1">
            <Button className="w-full" variant="default">
              <Navigation className="h-4 w-4 mr-2" />
              Track Live
            </Button>
          </Link>
          <Link href={`/search?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`}>
            <Button variant="outline">Find Similar</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
