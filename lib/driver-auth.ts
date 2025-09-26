"use client"

export interface Driver {
  id: string
  username: string
  name: string
  busNumber: string
  route: {
    from: string
    to: string
    id: string
  }
}

export const mockDrivers: Driver[] = [
  {
    id: "driver1",
    username: "john_driver",
    name: "John Smith",
    busNumber: "101",
    route: {
      from: "Central Station",
      to: "Airport Hub",
      id: "BUS001",
    },
  },
  {
    id: "driver2",
    username: "sarah_bus",
    name: "Sarah Johnson",
    busNumber: "205",
    route: {
      from: "Downtown Terminal",
      to: "University Campus",
      id: "BUS002",
    },
  },
  {
    id: "driver3",
    username: "mike_transit",
    name: "Mike Wilson",
    busNumber: "150",
    route: {
      from: "Business District",
      to: "Shopping Mall",
      id: "BUS003",
    },
  },
]

export function authenticateDriver(username: string, password: string): Driver | null {
  // Mock authentication - in real app, this would be a secure API call
  if (password === "driver123") {
    return mockDrivers.find((driver) => driver.username === username) || null
  }
  return null
}

export function getCurrentDriver(): Driver | null {
  if (typeof window === "undefined") return null

  const driverData = localStorage.getItem("current-driver")
  if (driverData) {
    try {
      return JSON.parse(driverData)
    } catch {
      return null
    }
  }
  return null
}

export function setCurrentDriver(driver: Driver | null) {
  if (typeof window === "undefined") return

  if (driver) {
    localStorage.setItem("current-driver", JSON.stringify(driver))
  } else {
    localStorage.removeItem("current-driver")
  }
}
