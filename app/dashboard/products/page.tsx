import { ProductManagement } from "@/features/product/pages/ProductManagement"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel | Products",
  description: "Admin panel with clean architecture consuming Fake Store API",
    generator: 'v0.dev'
}

export default function ProductsPage() {
  return <ProductManagement />
}
