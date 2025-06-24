"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProductCard } from "../components/ProductCard"
import { ProductForm } from "../components/ProductForm"
import { ProductFilters } from "../components/ProductFilters"
import { useProducts } from "../hooks/use-products"
import { useProductActions } from "../hooks/use-actions"
import type { Product, CreateProductRequest } from "@/entities/product"
import { Loader2, Plus } from "lucide-react"

export function ProductManagement() {
  const [filters, setFilters] = useState<{ category?: string; search?: string }>({})
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { products, isLoading, error, refetch } = useProducts({
    ...filters,
  })

  const {
    isSubmitting,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductActions({
    onRefetch: refetch,
    onCloseForm: () => {
      setIsFormOpen(false)
      setEditingProduct(null)
    },
  })

  const handleCreateProduct = createProduct
  const handleUpdateProduct = async (data: CreateProductRequest) => {
    if (editingProduct) {
      await updateProduct({ ...data, id: editingProduct.id })
    }
  }

  const handleDeleteProduct = deleteProduct

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-blue-500 text-white font-semibold">
          <Plus className="h-4 w-4 mr-2 " />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <ProductFilters onFiltersChange={setFilters} />

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDeleteProduct} />
          ))}
        </div>
      )}

      {/* Create/Edit Product Dialog */}
      <Dialog open={isFormOpen || !!editingProduct} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Create New Product"}</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct || undefined}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={closeForm}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
