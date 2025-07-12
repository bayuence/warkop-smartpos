import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password harus diisi" }, { status: 400 })
    }

    // Demo accounts as per README
    if (email === "admin@warkop.com" && password === "admin123") {
      return NextResponse.json({
        user: {
          id: 1,
          email: "admin@warkop.com",
          name: "Admin Staff",
          role: "admin",
        },
      })
    }

    if (email === "kasir@warkop.com" && password === "kasir123") {
      return NextResponse.json({
        user: {
          id: 2,
          email: "kasir@warkop.com",
          name: "Kasir Staff",
          role: "kasir",
        },
      })
    }

    // Check database for regular users
    const user = await getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
    }

    // For demo purposes, we'll accept any password for existing users
    // In production, you should verify the hashed password
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
