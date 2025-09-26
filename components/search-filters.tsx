"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

export interface FilterOptions {
  maxFare: number
  maxDuration: number
  departureTime: string
  sortBy: string
}

interface SearchFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  onClearFilters: () => void
}

export function SearchFilters({ filters, onFiltersChange, onClearFilters }: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const hasActiveFilters =
    filters.maxFare < 50 ||
    filters.maxDuration < 120 ||
    filters.departureTime !== "any" ||
    filters.sortBy !== "departure"

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                Active
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="md:hidden">
              {isExpanded ? "Hide" : "Show"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`space-y-6 ${isExpanded ? "block" : "hidden md:block"}`}>
        {/* Max Fare Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Max Fare: ${filters.maxFare}</Label>
          <Slider
            value={[filters.maxFare]}
            onValueChange={(value) => handleFilterChange("maxFare", value[0])}
            max={50}
            min={5}
            step={2.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$5</span>
            <span>$50</span>
          </div>
        </div>

        {/* Max Duration Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Max Duration: {filters.maxDuration} min</Label>
          <Slider
            value={[filters.maxDuration]}
            onValueChange={(value) => handleFilterChange("maxDuration", value[0])}
            max={120}
            min={15}
            step={15}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>15 min</span>
            <span>2 hours</span>
          </div>
        </div>

        {/* Departure Time Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Departure Time</Label>
          <Select value={filters.departureTime} onValueChange={(value) => handleFilterChange("departureTime", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Time</SelectItem>
              <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
              <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Sort By</Label>
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="departure">Departure Time</SelectItem>
              <SelectItem value="fare">Fare (Low to High)</SelectItem>
              <SelectItem value="duration">Duration (Shortest)</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
