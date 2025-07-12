"use client"

import type React from "react"
import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"

interface User {
  id: number
  email: string
  name: string
  role: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role === "customer") {
      router.push("/menu")
      return
    }
    setUser(parsedUser)
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-coffee-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-coffee-500 mx-auto"></div>
          <p className="mt-4 text-coffee-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-coffee-50">
        <AppSidebar user={user} />
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <Suspense fallback={<div>Loading...</div>}>
            <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-coffee-200">
              <div className="flex h-16 items-center gap-4 px-6">
                <SidebarTrigger className="text-coffee-600 hover:bg-coffee-100" />
                <div className="flex-1" />
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-coffee-600 hover:bg-coffee-100">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-coffee-600 hover:bg-coffee-100 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                  </Button>
                </div>
              </div>
            </header>
          </Suspense>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-coffee-50">{children}</main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
