import { type NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let products = await getProducts()

    // Filter by category if specified
    if (category && category !== "Semua") {
      products = products.filter((product) => product.category_name === category)
    }

    // Transform data for frontend
    const transformedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      category: product.category_name,
      image: product.image,
      popular: product.popular,
      rating: Number(product.rating),
      discount: product.discount,
      stock: product.stock,
    }))

    return NextResponse.json({ products: transformedProducts })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
