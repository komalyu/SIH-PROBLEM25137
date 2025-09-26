"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { google } from "google-maps"

interface BusPosition {
  lat: number
  lng: number
  heading: number
}

interface LiveMapProps {
  busId: string
  route: {
    from: string
    to: string
    waypoints: { lat: number; lng: number }[]
  }
  onPositionUpdate?: (position: BusPosition) => void
}

export function LiveMap({ busId, route, onPositionUpdate }: LiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [busMarker, setBusMarker] = useState<google.maps.Marker | null>(null)
  const [currentPosition, setCurrentPosition] = useState<BusPosition>({
    lat: route.waypoints[0]?.lat || 40.7128,
    lng: route.waypoints[0]?.lng || -74.006,
    heading: 0,
  })
  const [waypointIndex, setWaypointIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Mock Google Maps API loading
  useEffect(() => {
    // Simulate Google Maps API loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Initialize map (mock)
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return

    // Mock map initialization
    const mockMap = {
      setCenter: () => {},
      setZoom: () => {},
      panTo: () => {},
    } as any

    setMap(mockMap)
  }, [isLoaded])

  // Simulate bus movement
  useEffect(() => {
    if (!map || route.waypoints.length === 0) return

    const interval = setInterval(() => {
      setWaypointIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % route.waypoints.length
        const nextWaypoint = route.waypoints[nextIndex]

        if (nextWaypoint) {
          const newPosition = {
            lat: nextWaypoint.lat + (Math.random() - 0.5) * 0.001, // Add some randomness
            lng: nextWaypoint.lng + (Math.random() - 0.5) * 0.001,
            heading: Math.random() * 360,
          }

          setCurrentPosition(newPosition)
          onPositionUpdate?.(newPosition)
        }

        return nextIndex
      })
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [map, route.waypoints, onPositionUpdate])

  if (!isLoaded) {
    return (
      <Card className="h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-96">
      <CardContent className="p-0 h-full">
        <div
          ref={mapRef}
          className="w-full h-full rounded-lg bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 relative overflow-hidden"
        >
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-32 h-2 bg-gray-400 rounded"></div>
            <div className="absolute top-8 left-4 w-24 h-2 bg-gray-400 rounded"></div>
            <div className="absolute top-12 right-8 w-20 h-2 bg-gray-400 rounded"></div>
            <div className="absolute bottom-8 left-8 w-28 h-2 bg-gray-400 rounded"></div>
            <div className="absolute bottom-12 right-4 w-16 h-2 bg-gray-400 rounded"></div>
          </div>

          {/* Route Path */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d={`M 50 50 Q 200 100 350 200 T 300 350`}
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>

          {/* Bus Marker */}
          <div
            className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out"
            style={{
              left: `${30 + ((waypointIndex * 15) % 60)}%`,
              top: `${40 + ((waypointIndex * 10) % 40)}%`,
              transform: `translate(-50%, -50%) rotate(${currentPosition.heading}deg)`,
            }}
          >
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-full h-full bg-red-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Start and End Markers */}
          <div className="absolute top-12 left-12 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-green-700 dark:text-green-300 whitespace-nowrap">
              {route.from}
            </div>
          </div>
          <div className="absolute bottom-16 right-16 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg">
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-blue-700 dark:text-blue-300 whitespace-nowrap">
              {route.to}
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded shadow-lg flex items-center justify-center text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700">
              +
            </button>
            <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded shadow-lg flex items-center justify-center text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700">
              −
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
