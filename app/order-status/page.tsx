"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Coffee, Home } from "lucide-react"

export default function OrderStatusPage() {
  const [orderStatus, setOrderStatus] = useState("confirmed")
  const [estimatedTime, setEstimatedTime] = useState(15)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))

    // Simulate order status updates
    const timer1 = setTimeout(() => setOrderStatus("preparing"), 3000)
    const timer2 = setTimeout(() => setOrderStatus("ready"), 10000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [router])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "confirmed":
        return {
          title: "Pesanan Dikonfirmasi",
          description: "Pesanan Anda telah diterima dan sedang diproses",
          color: "bg-blue-500",
          icon: CheckCircle,
        }
      case "preparing":
        return {
          title: "Sedang Dimasak",
          description: "Chef sedang menyiapkan pesanan Anda",
          color: "bg-yellow-500",
          icon: Coffee,
        }
      case "ready":
        return {
          title: "Pesanan Siap",
          description: "Pesanan Anda sudah siap dan akan segera diantar",
          color: "bg-green-500",
          icon: CheckCircle,
        }
      default:
        return {
          title: "Status Tidak Diketahui",
          description: "",
          color: "bg-gray-500",
          icon: Clock,
        }
    }
  }

  const statusInfo = getStatusInfo(orderStatus)
  const StatusIcon = statusInfo.icon

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-coffee-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Status Card */}
        <Card className="text-center">
          <CardHeader>
            <div className={`w-20 h-20 ${statusInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <StatusIcon className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">{statusInfo.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">{statusInfo.description}</p>

            {orderStatus !== "ready" && (
              <div className="bg-coffee-100 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5 text-coffee-600" />
                  <span className="text-coffee-700 font-medium">Estimasi: {estimatedTime} menit</span>
                </div>
              </div>
            )}

            {/* Order Details */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">Detail Pesanan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Nomor Pesanan:</span>
                  <span className="font-medium">#WK001</span>
                </div>
                <div className="flex justify-between">
                  <span>Meja:</span>
                  <span className="font-medium">03</span>
                </div>
                <div className="flex justify-between">
                  <span>Waktu Pesan:</span>
                  <span className="font-medium">
                    {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    ["confirmed", "preparing", "ready"].includes(orderStatus) ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Pesanan Dikonfirmasi</span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    ["preparing", "ready"].includes(orderStatus) ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <Coffee className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Sedang Dimasak</span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    orderStatus === "ready" ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm">Siap Disajikan</span>
              </div>
            </div>

            {orderStatus === "ready" && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                <p className="text-green-800 font-medium text-center">
                  🎉 Pesanan Anda sudah siap! Silakan menuju meja Anda.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/menu")}
                className="w-full h-12 rounded-2xl bg-coffee-500 hover:bg-coffee-600 text-white font-semibold"
              >
                Pesan Lagi
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full h-12 rounded-2xl border-coffee-300 text-coffee-600 hover:bg-coffee-50"
              >
                <Home className="h-5 w-5 mr-2" />
                Kembali ke Beranda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
