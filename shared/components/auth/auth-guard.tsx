"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import { AuthService } from "@/features/auth/services/auth-service"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading, setUser, setAuthenticated, setLoading } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true)
      try {
        const user = await AuthService.getCurrentUser()
        if (user) {
          setUser(user)
          setAuthenticated(true)
        } else {
          router.push("/login")
        }
      } catch (error) {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    if (!isAuthenticated) {
      checkAuth()
    }
  }, [isAuthenticated, router, setUser, setAuthenticated, setLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
