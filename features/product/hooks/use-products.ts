"use client"

import { useState, useEffect } from "react"
import type { Product, ProductFilters } from "@/entities/product"
import { ProductService } from "../services/product-service"

export function useProducts(filters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await ProductService.getProducts(filters)
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filters?.category, filters?.search, filters?.page, filters?.limit])

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  }
}
