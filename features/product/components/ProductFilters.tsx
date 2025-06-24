"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useCategories } from "../hooks/use-categories"
import { ProductFiltersProps } from "@/entities/product"

export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
  
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string>("")
  const { categories } = useCategories()

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFiltersChange({ category: category || undefined, search: value || undefined })
  }

  const handleCategoryChange = (value: string) => {
    const newCategory = value === "all" ? "" : value
    setCategory(newCategory)
    onFiltersChange({ category: newCategory || undefined, search: search || undefined })
  }

  const clearFilters = () => {
    setSearch("")
    setCategory("")
    onFiltersChange({})
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 bg-muted/50 rounded-lg">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={category || "all"} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(search || category) && (
        <Button variant="outline" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
