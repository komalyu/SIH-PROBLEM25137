"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DriverDashboardContent } from "@/components/driver-dashboard-content"
import { getCurrentDriver, setCurrentDriver, type Driver } from "@/lib/driver-auth"
import { useToast } from "@/hooks/use-toast"

export default function DriverDashboardPage() {
  const [driver, setDriver] = useState<Driver | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const currentDriver = getCurrentDriver()
    if (currentDriver) {
      setDriver(currentDriver)
    } else {
      router.push("/driver-login")
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    setCurrentDriver(null)
    setDriver(null)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/driver-login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!driver) {
    return null // Will redirect to login
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DriverDashboardContent driver={driver} onLogout={handleLogout} />
    </div>
  )
}
