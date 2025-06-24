"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductCard } from "../components/ProductCard"
import { ProductFilters } from "../components/ProductFilters"
import { useProducts } from "../hooks/use-products"
import { Package, TrendingUp, DollarSign, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProductDashboard() {
  const [filters, setFilters] = useState<{ category?: string; search?: string }>({})
  const [visibleCount, setVisibleCount] = useState(8)
  const { products, isLoading, error } = useProducts({ ...filters })

  const visibleProducts = products.slice(0, visibleCount)

  const stats = {
    totalProducts: products.length,
    avgPrice:
      products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : "0",
    avgRating:
      products.length > 0 ? (products.reduce((sum, p) => sum + p.rating.rate, 0) / products.length).toFixed(1) : "0",
    categories: new Set(products.map((p) => p.category)).size,
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">
          <p>Error loading products: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your product catalog</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgPrice}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.categories}</div>
          </CardContent>
        </Card>
      </div>

      <ProductFilters onFiltersChange={(newFilters) => {
        setFilters(newFilters)
        setVisibleCount(8) 
      }} />

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {visibleCount < products.length && (
              <div className="text-center mt-6">
                <Button onClick={() => setVisibleCount((prev) => prev + 8)} className="bg-purple-600 text-white font-semibold py-2 px-4 rounded">Load More</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
