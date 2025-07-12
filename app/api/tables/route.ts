import { NextResponse } from "next/server"
import { getTables } from "@/lib/database"

export async function GET() {
  try {
    const tables = await getTables()

    const transformedTables = tables.map((table) => ({
      id: table.id,
      number: table.number,
      capacity: table.capacity,
      location: table.location,
      status: table.status,
    }))

    return NextResponse.json({ tables: transformedTables })
  } catch (error) {
    console.error("Error fetching tables:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
