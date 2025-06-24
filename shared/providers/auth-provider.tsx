"use client"

import type React from "react"

import { useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { AuthService } from "@/features/auth/services/auth-service"

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setAuthenticated, setLoading } = useAuthStore()

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      try {
        const user = await AuthService.getCurrentUser()
        if (user) {
          setUser(user)
          setAuthenticated(true)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [setUser, setAuthenticated, setLoading])

  return <>{children}</>
}
