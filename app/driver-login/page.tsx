"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DriverLoginForm } from "@/components/driver-login-form"
import { getCurrentDriver } from "@/lib/driver-auth"

export default function DriverLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if driver is already logged in
    const currentDriver = getCurrentDriver()
    if (currentDriver) {
      router.push("/driver-dashboard")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <DriverLoginForm />
    </div>
  )
}
