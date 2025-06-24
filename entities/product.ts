import { ProductFormData } from "@/features/product/schemas/product-schema"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CreateProductRequest {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: number
}

export interface ProductFilters {
  category?: string
  search?: string
  page?: number
  limit?: number
}


export interface ProductCardProps {
  product: Product
  onEdit?: (product: Product) => void
  onDelete?: (id: number) => void
}

export interface ProductFiltersProps {
  onFiltersChange: (filters: { category?: string; search?: string }) => void
}

export interface ProductFormProps {
  product?: Product
  onSubmit: (data: ProductFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}