"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuthStore } from "@/store/auth-store"
import { AuthService } from "@/features/auth/services/auth-service"
import { LayoutDashboard, Package, LogOut, Menu, X } from "lucide-react"
import { navigation } from "@/shared/config/constants"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, setUser, setAuthenticated } = useAuthStore()

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      setUser(null)
      setAuthenticated(false)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="w-full bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <nav className="hidden md:flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.username}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Page Content */}
      <main className="px-4 py-6">{children}</main>
    </div>
  )
}
