"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, DollarSign, Heart, Navigation, Zap } from "lucide-react"
import type { BusRoute } from "@/lib/dummy-data"
import Link from "next/link"

interface BusCardProps {
  route: BusRoute
  onToggleFavorite: (routeId: string) => void
  isFavorite: boolean
}

export function BusCard({ route, onToggleFavorite, isFavorite }: BusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "delayed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "early":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    /* Enhanced card with mobile-friendly design and animations */
    <Card className="mobile-card hover:scale-[1.02] transition-all duration-300 group border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <CardHeader className="pb-4 relative">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {route.busName}
              </h3>
              <Badge variant="outline" className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/30">
                #{route.busNumber}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                {route.from} → {route.to}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(route.id)}
            className={`p-3 rounded-full hover:scale-110 transition-all duration-300 ${
              isFavorite
                ? "text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20"
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 relative">
        {/* Timing and Status */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {route.departureTime} - {route.arrivalTime}
              </div>
              <div className="text-sm text-muted-foreground">Duration: {route.duration}</div>
            </div>
          </div>
          <Badge className={`${getStatusColor(route.status)} border font-semibold px-3 py-1 rounded-full`}>
            {route.status}
          </Badge>
        </div>

        {/* Fare */}
        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">${route.fare}</div>
              <div className="text-sm text-muted-foreground">Per person</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Best Price</div>
            <div className="flex items-center gap-1 text-green-400">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-medium">LIVE</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link href={`/track/${route.id}`} className="w-full block">
            <Button className="mobile-button w-full group">
              <Navigation className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Track Live Location
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
