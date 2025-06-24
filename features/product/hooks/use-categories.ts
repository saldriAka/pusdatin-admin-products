"use client"

import { useState, useEffect } from "react"
import { ProductService } from "../services/product-service"

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ProductService.getCategories()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch categories")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, isLoading, error }
}
