import { NextResponse } from "next/server"
import { getCategories } from "@/lib/database"

export async function GET() {
  try {
    const categories = await getCategories()

    // Add "Semua" category at the beginning
    const allCategories = [
      { id: 0, name: "Semua", icon: "✨", gradient: "from-purple-500 to-pink-500" },
      ...categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        gradient: cat.gradient,
      })),
    ]

    return NextResponse.json({ categories: allCategories })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
