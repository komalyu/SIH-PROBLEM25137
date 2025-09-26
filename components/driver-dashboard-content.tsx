"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, AlertTriangle, CheckCircle, Navigation, LogOut } from "lucide-react"
import type { Driver } from "@/lib/driver-auth"
import { useToast } from "@/hooks/use-toast"

interface DriverDashboardContentProps {
  driver: Driver
  onLogout: () => void
}

export function DriverDashboardContent({ driver, onLogout }: DriverDashboardContentProps) {
  const [currentLocation, setCurrentLocation] = useState("")
  const [busStatus, setBusStatus] = useState<"on-time" | "delayed" | "early">("on-time")
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate GPS location updates
    const locations = [
      "Central Station - Platform 3",
      "Main Street & 5th Avenue",
      "Downtown Terminal - Bay 2",
      "University Campus - North Gate",
      "Shopping Mall - East Entrance",
    ]

    const interval = setInterval(() => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)]
      setCurrentLocation(randomLocation)
      setLastUpdate(new Date())
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleStatusUpdate = async () => {
    setIsUpdating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLastUpdate(new Date())
    setIsUpdating(false)

    toast({
      title: "Status updated",
      description: `Bus status updated to ${busStatus}`,
    })
  }

  const handleLocationUpdate = () => {
    const locations = [
      "Central Station - Platform 3",
      "Main Street & 5th Avenue",
      "Downtown Terminal - Bay 2",
      "University Campus - North Gate",
      "Shopping Mall - East Entrance",
    ]

    const randomLocation = locations[Math.floor(Math.random() * locations.length)]
    setCurrentLocation(randomLocation)
    setLastUpdate(new Date())

    toast({
      title: "Location updated",
      description: "GPS location has been refreshed",
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-time":
        return <CheckCircle className="h-4 w-4" />
      case "delayed":
        return <AlertTriangle className="h-4 w-4" />
      case "early":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Driver Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {driver.name}</p>
        </div>
        <Button variant="outline" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Assigned Route */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Assigned Route
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Bus Number</p>
              <p className="text-xl font-bold text-foreground">#{driver.busNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Route</p>
              <p className="font-medium text-foreground">
                {driver.route.from} → {driver.route.to}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge className={getStatusColor(busStatus)}>
                {getStatusIcon(busStatus)}
                <span className="ml-1">{busStatus}</span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Current Location */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">GPS Location</p>
              <p className="font-medium text-foreground">{currentLocation || "Updating location..."}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm text-foreground">{lastUpdate.toLocaleTimeString()}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLocationUpdate} className="w-full bg-transparent">
              <Navigation className="h-4 w-4 mr-2" />
              Update Location
            </Button>
          </CardContent>
        </Card>

        {/* Status Control */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Bus Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Update Status</Label>
              <Select value={busStatus} onValueChange={(value: any) => setBusStatus(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-time">On Time</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="early">Early</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleStatusUpdate} disabled={isUpdating} className="w-full">
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </div>
              ) : (
                "Update Status"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Manual Location Input */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Manual Location Update</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="manual-location">Current Location</Label>
              <Input
                id="manual-location"
                placeholder="Enter current location or stop"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleLocationUpdate}>
                <MapPin className="h-4 w-4 mr-2" />
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Status updated to {busStatus}</p>
                <p className="text-xs text-muted-foreground">{lastUpdate.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Location updated</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(lastUpdate.getTime() - 300000).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Navigation className="h-5 w-5 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Route started</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(lastUpdate.getTime() - 1800000).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
