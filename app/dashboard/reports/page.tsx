"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Sale {
  id: number
  date: string
  items: string[]
  total: number
  customer: string
  paymentMethod: 'cash' | 'card' | 'digital'
}

interface DailySummary {
  date: string
  totalSales: number
  totalOrders: number
  averageOrder: number
}

export default function ReportsPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [dailySummary, setDailySummary] = useState<DailySummary[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("7days")

  useEffect(() => {
    // Sample sales data
    const sampleSales: Sale[] = [
      {
        id: 1,
        date: "2024-01-15",
        items: ["Americano", "Croissant"],
        total: 33000,
        customer: "Ahmad Budi",
        paymentMethod: 'cash'
      },
      {
        id: 2,
        date: "2024-01-15",
        items: ["Cappuccino", "Sandwich"],
        total: 42000,
        customer: "Siti Nurhaliza",
        paymentMethod: 'card'
      },
      {
        id: 3,
        date: "2024-01-14",
        items: ["Latte", "Cake"],
        total: 48000,
        customer: "Rudi Hartono",
        paymentMethod: 'digital'
      }
    ]

    const sampleDailySummary: DailySummary[] = [
      {
        date: "2024-01-15",
        totalSales: 750000,
        totalOrders: 28,
        averageOrder: 26786
      },
      {
        date: "2024-01-14",
        totalSales: 680000,
        totalOrders: 25,
        averageOrder: 27200
      },
      {
        date: "2024-01-13",
        totalSales: 820000,
        totalOrders: 32,
        averageOrder: 25625
      }
    ]

    setSales(sampleSales)
    setDailySummary(sampleDailySummary)
    setLoading(false)
  }, [])

  const totalRevenue = dailySummary.reduce((sum, day) => sum + day.totalSales, 0)
  const totalOrders = dailySummary.reduce((sum, day) => sum + day.totalOrders, 0)
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-2xl">⏳</span>
        <span className="ml-2 text-lg">Loading reports...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Sales analytics and business insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            📊 Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span>💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <span>📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <span>📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {Math.round(averageOrderValue).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <span>📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.2%</div>
            <p className="text-xs text-muted-foreground">
              Compared to last period
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
            <CardDescription>Sales performance by day</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Avg Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailySummary.map((day) => (
                  <TableRow key={day.date}>
                    <TableCell>{day.date}</TableCell>
                    <TableCell>Rp {day.totalSales.toLocaleString()}</TableCell>
                    <TableCell>{day.totalOrders}</TableCell>
                    <TableCell>Rp {day.averageOrder.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest sales transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.date}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {sale.items.join(", ")}
                      </div>
                    </TableCell>
                    <TableCell>Rp {sale.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        sale.paymentMethod === 'cash' ? 'bg-green-100 text-green-800' :
                        sale.paymentMethod === 'card' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {sale.paymentMethod}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
