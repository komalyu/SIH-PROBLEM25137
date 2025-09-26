"use client"

import { useFavorites } from "@/hooks/use-favorites"
import { FavoriteRouteCard } from "@/components/favorite-route-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function FavoritesPage() {
  const { getFavoriteRoutes, removeFavorite, clearAllFavorites, isLoaded } = useFavorites()
  const { toast } = useToast()
  const favoriteRoutes = getFavoriteRoutes()

  const handleRemoveFavorite = (routeId: string) => {
    removeFavorite(routeId)
    toast({
      title: "Removed from favorites",
      description: "The route has been removed from your favorites.",
    })
  }

  const handleClearAll = () => {
    clearAllFavorites()
    toast({
      title: "All favorites cleared",
      description: "All favorite routes have been removed.",
    })
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Favorite Routes</h1>
            <p className="text-muted-foreground">
              {favoriteRoutes.length} saved route{favoriteRoutes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {favoriteRoutes.length > 0 && (
          <Button variant="outline" onClick={handleClearAll} className="text-red-500 hover:text-red-600 bg-transparent">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {favoriteRoutes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {favoriteRoutes.map((route) => (
            <FavoriteRouteCard key={route.id} route={route} onRemove={handleRemoveFavorite} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No favorite routes yet</h2>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Start adding routes to your favorites by clicking the heart icon on any bus route. This will help you
              quickly access your most used routes.
            </p>
            <Link href="/search">
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search for Routes
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {favoriteRoutes.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">Looking for more routes?</p>
          <Link href="/search">
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search for More Routes
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
