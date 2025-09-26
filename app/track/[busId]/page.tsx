"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { LiveMap } from "@/components/live-map"
import { TrackingSidebar } from "@/components/tracking-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { dummyRoutes } from "@/lib/dummy-data"
import Link from "next/link"

interface BusPosition {
  lat: number
  lng: number
  heading: number
}

export default function TrackBusPage() {
  const params = useParams()
  const router = useRouter()
  const busId = params.busId as string

  const [currentPosition, setCurrentPosition] = useState<BusPosition>()
  const [nextStop, setNextStop] = useState("Downtown Terminal")
  const [estimatedArrival, setEstimatedArrival] = useState("5 min")
  const [speed, setSpeed] = useState(25)
  const [distance, setDistance] = useState("2.3 km")
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Find the bus route
  const route = dummyRoutes.find((r) => r.id === busId)

  // Mock route waypoints
  const mockRoute = {
    from: route?.from || "Central Station",
    to: route?.to || "Airport Hub",
    waypoints: [
      { lat: 40.7128, lng: -74.006 },
      { lat: 40.7589, lng: -73.9851 },
      { lat: 40.7831, lng: -73.9712 },
      { lat: 40.7614, lng: -73.9776 },
      { lat: 40.7505, lng: -73.9934 },
    ],
  }

  // Mock stops for the route
  const stops = [
    "Central Station",
    "Downtown Terminal",
    "Business District",
    "University Campus",
    "Shopping Mall",
    "Airport Hub",
  ]

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      // Update next stop
      const currentStopIndex = Math.floor(Math.random() * stops.length)
      setNextStop(stops[currentStopIndex] || "Downtown Terminal")

      // Update ETA (random between 2-15 minutes)
      const eta = Math.floor(Math.random() * 13) + 2
      setEstimatedArrival(`${eta} min`)

      // Update speed (random between 15-35 mph)
      setSpeed(Math.floor(Math.random() * 20) + 15)

      // Update distance (random between 0.5-5 km)
      const dist = (Math.random() * 4.5 + 0.5).toFixed(1)
      setDistance(`${dist} km`)

      setLastUpdated(new Date())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handlePositionUpdate = (position: BusPosition) => {
    setCurrentPosition(position)
  }

  const handleRefresh = () => {
    setLastUpdated(new Date())
    // Trigger a refresh of live data
    const eta = Math.floor(Math.random() * 13) + 2
    setEstimatedArrival(`${eta} min`)
  }

  if (!route) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Bus Not Found</h1>
          <p className="text-muted-foreground mb-6">The bus with ID "{busId}" could not be found.</p>
          <Link href="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Live Tracking - Bus {route.busNumber}</h1>
            <p className="text-muted-foreground">
              {route.from} → {route.to}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <LiveMap busId={busId} route={mockRoute} onPositionUpdate={handlePositionUpdate} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <TrackingSidebar
            route={route}
            currentPosition={currentPosition}
            nextStop={nextStop}
            estimatedArrival={estimatedArrival}
            speed={speed}
            distance={distance}
          />
        </div>
      </div>

      {/* Mobile-friendly bottom info */}
      <div className="lg:hidden mt-6 text-center">
        <p className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
      </div>
    </div>
  )
}
