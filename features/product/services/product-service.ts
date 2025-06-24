import { fakeStoreAPI } from "@/infrastructure/api/fake-store-api"
import type { Product, CreateProductRequest, UpdateProductRequest, ProductFilters } from "@/entities/product"

export class ProductService {
  static async getProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      let products = await fakeStoreAPI.getProducts()

      // Apply filters
      if (filters?.category) {
        products = products.filter((p) => p.category === filters.category)
      }

      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase()
        products = products.filter(
          (p) => p.title.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm),
        )
      }

      // Apply pagination
      if (filters?.page && filters?.limit) {
        const start = (filters.page - 1) * filters.limit
        const end = start + filters.limit
        products = products.slice(start, end)
      }

      return products
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static async getProduct(id: number): Promise<Product> {
    try {
      return await fakeStoreAPI.getProduct(id)
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      return await fakeStoreAPI.getCategories()
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static async createProduct(product: CreateProductRequest): Promise<Product> {

    try {
      const createdProduct = await fakeStoreAPI.createProduct(product)
      console.log(createdProduct)
      return createdProduct
    } catch (error) {
      throw new Error(`Failed to create product: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static async updateProduct(product: UpdateProductRequest): Promise<Product> {
    try {
      const updatedProduct = await fakeStoreAPI.updateProduct(product)
      console.log(updatedProduct)
      return updatedProduct
    } catch (error) {
      throw new Error(`Failed to update product: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static async deleteProduct(id: number): Promise<void> {
    console.log('deleteProduct')
    try {
      const deleteProduct = await fakeStoreAPI.deleteProduct(id)
      console.log(deleteProduct)
    } catch (error) {
      throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }
}
