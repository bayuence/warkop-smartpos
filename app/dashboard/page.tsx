"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface User {
  id: number
  email: string
  name: string
  role: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({
    todaySales: 0,
    todayOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    avgOrderValue: 0,
    growthRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    fetchStats()
  }, [router])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount)
  }

  const getCurrentTime = () => {
    return new Date().toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="animate-slide-in-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Dashboard Admin
          </h1>
          <p className="text-gray-600 flex items-center gap-2 mt-2">
            <span>🕐</span>
            {getCurrentTime()}
          </p>
          <p className="text-lg text-gray-700 mt-1">Selamat datang kembali, {user.name}! 👋</p>
        </div>
        <div className="flex items-center gap-3 animate-slide-in-right">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2">
            <span className="mr-2">⚡</span>
            System Online
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2">
            <span className="mr-2">⭐</span>
            {user.role === "admin" ? "Administrator" : "Staff"}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Penjualan Hari Ini",
            value: formatCurrency(stats.todaySales),
            change: "+18.5%",
            icon: "💰",
            gradient: "from-green-500 to-emerald-600",
            delay: "0s",
          },
          {
            title: "Pesanan Hari Ini",
            value: stats.todayOrders.toString(),
            change: "+12.3%",
            icon: "🛒",
            gradient: "from-blue-500 to-cyan-600",
            delay: "0.1s",
          },
          {
            title: "Total Produk",
            value: stats.totalProducts.toString(),
            change: "5 kategori",
            icon: "📦",
            gradient: "from-purple-500 to-pink-600",
            delay: "0.2s",
          },
          {
            title: "Total Pelanggan",
            value: stats.totalCustomers.toString(),
            change: "+25 baru",
            icon: "👥",
            gradient: "from-orange-500 to-red-600",
            delay: "0.3s",
          },
        ].map((stat, index) => (
          <Card
            key={stat.title}
            className="bg-white/80 backdrop-blur-md border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-scale-in"
            style={{ animationDelay: stat.delay }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                <span className="text-xl text-white">{stat.icon}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <p className="text-sm text-green-600 font-medium">{stat.change} dari kemarin</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200/50 animate-slide-in-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary-700">
              <span>⚡</span>
              Aksi Cepat
            </CardTitle>
            <CardDescription>Akses fitur utama dengan satu klik</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Kasir POS",
                icon: "🛒",
                url: "/dashboard/pos",
                gradient: "from-green-500 to-emerald-600",
              },
              { title: "Kelola Menu", icon: "☕", url: "/dashboard/products", gradient: "from-blue-500 to-cyan-600" },
              {
                title: "Laporan",
                icon: "📈",
                url: "/dashboard/reports",
                gradient: "from-purple-500 to-pink-600",
              },
              { title: "Pelanggan", icon: "👥", url: "/dashboard/customers", gradient: "from-orange-500 to-red-600" },
            ].map((action, index) => (
              <Button
                key={action.title}
                onClick={() => router.push(action.url)}
                className={`h-24 flex flex-col gap-2 bg-gradient-to-r ${action.gradient} hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-white border-0 animate-bounce-in`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <span className="text-3xl">{action.icon}</span>
                <span className="font-semibold">{action.title}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 animate-slide-in-right">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-700">
              <span>🕐</span>
              Pesanan Real-time
            </CardTitle>
            <CardDescription>Pesanan terbaru yang masuk hari ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "#WK001",
                  customer: "Ahmad Rizki",
                  total: 65000,
                  time: "2 menit lalu",
                  status: "Baru",
                  statusColor: "bg-blue-500",
                },
                {
                  id: "#WK002",
                  customer: "Sari Dewi",
                  total: 42000,
                  time: "5 menit lalu",
                  status: "Proses",
                  statusColor: "bg-yellow-500",
                },
                {
                  id: "#WK003",
                  customer: "Budi Santoso",
                  total: 38000,
                  time: "8 menit lalu",
                  status: "Selesai",
                  statusColor: "bg-green-500",
                },
                {
                  id: "#WK004",
                  customer: "Maya Putri",
                  total: 75000,
                  time: "12 menit lalu",
                  status: "Proses",
                  statusColor: "bg-yellow-500",
                },
                {
                  id: "#WK005",
                  customer: "Doni Pratama",
                  total: 28000,
                  time: "15 menit lalu",
                  status: "Selesai",
                  statusColor: "bg-green-500",
                },
              ].map((order, index) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 animate-fade-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${order.statusColor} rounded-full animate-pulse`}></div>
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(order.total)}</p>
                    <Badge className={`${order.statusColor} text-white border-0 text-xs`}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4 border-primary-200 text-primary-600 hover:bg-primary-50 bg-transparent"
              onClick={() => router.push("/dashboard/pos")}
            >
              Lihat Semua Pesanan
              <span className="ml-2">→</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card
        className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-200/50 animate-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary-700">
            <span>📈</span>
            Performa Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{stats.todayOrders}</div>
              <p className="text-sm text-gray-600">Total Pesanan</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{formatCurrency(stats.avgOrderValue)}</div>
              <p className="text-sm text-gray-600">Rata-rata per Pesanan</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                  style={{ width: "72%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{stats.growthRate}%</div>
              <p className="text-sm text-gray-600">Pertumbuhan</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{formatCurrency(stats.todaySales)}</div>
              <p className="text-sm text-gray-600">Total Penjualan</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
