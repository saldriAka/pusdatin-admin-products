import { ProductDashboard } from "@/features/product/pages/ProductDashboard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel | Dashboard",
  description: "Admin panel with clean architecture consuming Fake Store API",
    generator: 'v0.dev'
}

export default function DashboardPage() {
  return <ProductDashboard />
}
