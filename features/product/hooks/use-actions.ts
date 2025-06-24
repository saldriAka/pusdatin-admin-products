import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { ProductService } from "../services/product-service"
import type { CreateProductRequest, Product } from "@/entities/product"

export function useProductActions({
  onRefetch,
  onCloseForm,
}: {
  onRefetch?: () => void
  onCloseForm?: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createProduct = async (data: CreateProductRequest) => {
    setIsSubmitting(true)
    try {
      await ProductService.createProduct(data)
      toast({
        title: "Success",
        description: "Product created successfully",
      })
      onCloseForm?.()
      onRefetch?.()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create product",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateProduct = async (data: CreateProductRequest & { id: number }) => {
    setIsSubmitting(true)
    try {
      await ProductService.updateProduct(data)
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
      onCloseForm?.()
      onRefetch?.()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update product",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      await ProductService.deleteProduct(id)
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
      onRefetch?.()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  return {
    isSubmitting,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
