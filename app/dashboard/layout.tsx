import type React from "react"
import { AdminLayout } from "@/shared/components/layout/admin-layout"
import { AuthGuard } from "@/shared/components/auth/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  )
}
