export interface BusRoute {
  id: string
  busName: string
  busNumber: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  fare: number
  duration: string
  status: "on-time" | "delayed" | "early"
}

export const cities = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
  "Austin, TX",
  "Jacksonville, FL",
  "Fort Worth, TX",
  "Columbus, OH",
  "Charlotte, NC",
  "San Francisco, CA",
  "Indianapolis, IN",
  "Seattle, WA",
  "Denver, CO",
  "Washington, DC",
  "Boston, MA",
  "El Paso, TX",
  "Nashville, TN",
  "Detroit, MI",
  "Oklahoma City, OK",
  "Portland, OR",
  "Las Vegas, NV",
  "Memphis, TN",
  "Louisville, KY",
  "Baltimore, MD",
]

export const busStops = [
  "Central Station",
  "Downtown Terminal",
  "Airport Hub",
  "University Campus",
  "Shopping Mall",
  "Business District",
  "Residential Area",
  "Medical Center",
  "Sports Complex",
  "Convention Center",
  "Train Station",
  "Bus Depot",
  "City Hall",
  "Library",
  "Park & Ride",
]

export const dummyRoutes: BusRoute[] = [
  {
    id: "BUS001",
    busName: "Express Metro",
    busNumber: "101",
    from: "Central Station",
    to: "Airport Hub",
    departureTime: "08:30 AM",
    arrivalTime: "09:15 AM",
    fare: 12.5,
    duration: "45 min",
    status: "on-time",
  },
  {
    id: "BUS002",
    busName: "City Cruiser",
    busNumber: "205",
    from: "Downtown Terminal",
    to: "University Campus",
    departureTime: "09:00 AM",
    arrivalTime: "09:35 AM",
    fare: 8.75,
    duration: "35 min",
    status: "delayed",
  },
  {
    id: "BUS003",
    busName: "Rapid Transit",
    busNumber: "150",
    from: "Business District",
    to: "Shopping Mall",
    departureTime: "10:15 AM",
    arrivalTime: "10:45 AM",
    fare: 6.25,
    duration: "30 min",
    status: "on-time",
  },
  {
    id: "BUS004",
    busName: "Metro Express",
    busNumber: "301",
    from: "Medical Center",
    to: "Train Station",
    departureTime: "11:30 AM",
    arrivalTime: "12:20 PM",
    fare: 15.0,
    duration: "50 min",
    status: "early",
  },
  {
    id: "BUS005",
    busName: "City Link",
    busNumber: "88",
    from: "Park & Ride",
    to: "Convention Center",
    departureTime: "02:45 PM",
    arrivalTime: "03:25 PM",
    fare: 9.5,
    duration: "40 min",
    status: "on-time",
  },
]

export function searchRoutes(from: string, to: string): BusRoute[] {
  if (!from || !to) return dummyRoutes

  return dummyRoutes.filter(
    (route) =>
      route.from.toLowerCase().includes(from.toLowerCase()) || route.to.toLowerCase().includes(to.toLowerCase()),
  )
}
