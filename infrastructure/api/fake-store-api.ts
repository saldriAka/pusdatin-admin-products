import type { Product, CreateProductRequest, UpdateProductRequest } from "@/entities/product"

export class FakeStoreAPI {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getProducts(limit?: number): Promise<Product[]> {
    const endpoint = limit ? `/products?limit=${limit}` : "/products"
    return this.request<Product[]>(endpoint)
  }

  async getProduct(id: number): Promise<Product> {
    return this.request<Product>(`/products/${id}`)
  }

  async getCategories(): Promise<string[]> {
    return this.request<string[]>("/products/categories")
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.request<Product[]>(`/products/category/${category}`)
  }

  async createProduct(product: CreateProductRequest): Promise<Product> {
    return this.request<Product>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
  }

  async updateProduct(product: UpdateProductRequest): Promise<Product> {
    return this.request<Product>(`/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.request<Product>(`/products/${id}`, {
      method: "DELETE",
    })
  }
}

export const fakeStoreAPI = new FakeStoreAPI()
