"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import type { Product, ProductCardProps } from "@/entities/product"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Star } from "lucide-react"

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard/products"

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="aspect-square relative mb-2">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain rounded-md"
          />
        </div>
        <CardTitle className="text-sm line-clamp-2">{product.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <p className="text-lg font-bold">${product.price}</p>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        </div>
      </CardContent>

      {isDashboard && (
        <CardFooter className="pt-2 gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit?.(product)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" className="flex-1 bg-red-600 text-white font-semibold" onClick={() => onDelete?.(product.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
