import { NextResponse } from "next/server"
import { getDashboardStats } from "@/lib/database"

export async function GET() {
  try {
    const stats = await getDashboardStats()

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
