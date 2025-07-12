"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Table {
  id: number
  number: string
  capacity: number
  status: "available" | "occupied" | "reserved"
  location: string
}

export default function TableSelectionPage() {
  const [tables] = useState<Table[]>([
    { id: 1, number: "01", capacity: 2, status: "available", location: "Dalam" },
    { id: 2, number: "02", capacity: 4, status: "occupied", location: "Dalam" },
    { id: 3, number: "03", capacity: 2, status: "available", location: "Dalam" },
    { id: 4, number: "04", capacity: 6, status: "available", location: "Dalam" },
    { id: 5, number: "05", capacity: 4, status: "occupied", location: "Dalam" },
    { id: 6, number: "06", capacity: 2, status: "available", location: "Dalam" },
    { id: 7, number: "07", capacity: 8, status: "reserved", location: "Teras" },
    { id: 8, number: "08", capacity: 4, status: "available", location: "Teras" },
    { id: 9, number: "09", capacity: 2, status: "available", location: "Teras" },
    { id: 10, number: "10", capacity: 6, status: "occupied", location: "Teras" },
    { id: 11, number: "11", capacity: 4, status: "available", location: "Teras" },
    { id: 12, number: "12", capacity: 2, status: "available", location: "Teras" },
  ])

  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleTableSelect = (table: Table) => {
    if (table.status !== "available") {
      toast({
        title: "Meja tidak tersedia",
        description: "Silakan pilih meja lain yang tersedia",
        variant: "destructive",
      })
      return
    }
    setSelectedTable(table)
  }

  const handleConfirmOrder = () => {
    if (!selectedTable) {
      toast({
        title: "Pilih meja terlebih dahulu",
        description: "Anda harus memilih meja sebelum melanjutkan pesanan",
        variant: "destructive",
      })
      return
    }

    // Simulate order processing
    toast({
      title: "Pesanan berhasil!",
      description: `Pesanan Anda untuk meja ${selectedTable.number} telah diterima`,
    })

    // Clear cart and redirect
    localStorage.removeItem("cart")
    router.push("/order-status")
  }

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500 hover:bg-green-600 text-white border-green-500"
      case "occupied":
        return "bg-red-500 text-white border-red-500 cursor-not-allowed"
      case "reserved":
        return "bg-yellow-500 text-white border-yellow-500 cursor-not-allowed"
      default:
        return "bg-gray-500 text-white border-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Tersedia"
      case "occupied":
        return "Terisi"
      case "reserved":
        return "Dipesan"
      default:
        return "Unknown"
    }
  }

  const availableTables = tables.filter((table) => table.status === "available")
  const occupiedTables = tables.filter((table) => table.status !== "available")

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-coffee-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()} className="p-2">
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Pilih Meja</h1>
                <p className="text-sm text-gray-600">Pilih meja untuk pesanan Anda</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Legend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Keterangan Status Meja</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Tersedia ({availableTables.length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Terisi ({occupiedTables.length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Dipesan</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Indoor Tables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🏠</span>
                <span>Area Dalam</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {tables
                  .filter((table) => table.location === "Dalam")
                  .map((table) => (
                    <Button
                      key={table.id}
                      onClick={() => handleTableSelect(table)}
                      disabled={table.status !== "available"}
                      className={`h-20 w-full flex flex-col items-center justify-center space-y-1 rounded-2xl border-2 transition-all duration-200 ${getTableStatusColor(
                        table.status,
                      )} ${
                        selectedTable?.id === table.id
                          ? "ring-4 ring-coffee-300 scale-105"
                          : "hover:scale-105 active:scale-95"
                      }`}
                    >
                      <span className="text-lg font-bold">{table.number}</span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span className="text-xs">{table.capacity}</span>
                      </div>
                      {selectedTable?.id === table.id && <CheckCircle className="h-4 w-4" />}
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Outdoor Tables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🌿</span>
                <span>Area Teras</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {tables
                  .filter((table) => table.location === "Teras")
                  .map((table) => (
                    <Button
                      key={table.id}
                      onClick={() => handleTableSelect(table)}
                      disabled={table.status !== "available"}
                      className={`h-20 w-full flex flex-col items-center justify-center space-y-1 rounded-2xl border-2 transition-all duration-200 ${getTableStatusColor(
                        table.status,
                      )} ${
                        selectedTable?.id === table.id
                          ? "ring-4 ring-coffee-300 scale-105"
                          : "hover:scale-105 active:scale-95"
                      }`}
                    >
                      <span className="text-lg font-bold">{table.number}</span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span className="text-xs">{table.capacity}</span>
                      </div>
                      {selectedTable?.id === table.id && <CheckCircle className="h-4 w-4" />}
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Table Info */}
        {selectedTable && (
          <Card className="mt-8 border-coffee-200 bg-coffee-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-coffee-700">Meja Terpilih</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-coffee-500 text-white">Meja {selectedTable.number}</Badge>
                    <span className="text-sm text-coffee-600">
                      📍 {selectedTable.location} • 👥 {selectedTable.capacity} orang
                    </span>
                  </div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirm Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleConfirmOrder}
            disabled={!selectedTable}
            className="h-14 px-12 rounded-2xl bg-coffee-500 hover:bg-coffee-600 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedTable ? `Konfirmasi Pesanan - Meja ${selectedTable.number}` : "Pilih Meja Terlebih Dahulu"}
          </Button>
        </div>
      </div>
    </div>
  )
}
