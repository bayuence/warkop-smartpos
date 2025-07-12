"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, ArrowLeft, Play, Users, TrendingUp, Zap, ShoppingCart, CreditCard, CheckCircle, Clock, Star } from "lucide-react"

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState<string>("pos")

  const demoSections = [
    {
      id: "pos",
      title: "Kasir Digital",
      icon: ShoppingCart,
      description: "Sistem kasir cepat dan intuitif",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      icon: TrendingUp,
      description: "Laporan real-time dan insights bisnis",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "menu",
      title: "Menu Management",
      icon: Coffee,
      description: "Kelola menu dengan mudah",
      color: "from-amber-500 to-orange-500"
    },
    {
      id: "customers",
      title: "Customer Management",
      icon: Users,
      description: "Sistem loyalitas pelanggan",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const features = [
    {
      title: "Transaksi Super Cepat",
      description: "Proses pembayaran hanya dalam 3 detik dengan barcode scanner dan payment gateway terintegrasi",
      icon: Zap,
      stats: "3x Lebih Cepat",
      color: "text-yellow-400"
    },
    {
      title: "Analytics Real-time",
      description: "Dashboard yang menampilkan penjualan, profit, dan trend pelanggan secara real-time",
      icon: TrendingUp,
      stats: "Update Setiap Detik",
      color: "text-green-400"
    },
    {
      title: "Multi Payment Gateway",
      description: "Terima pembayaran dari berbagai metode: Cash, QRIS, E-wallet, Credit Card",
      icon: CreditCard,
      stats: "15+ Metode Bayar",
      color: "text-blue-400"
    },
    {
      title: "Customer Loyalty",
      description: "Sistem poin otomatis, member card digital, dan personalisasi promosi",
      icon: Star,
      stats: "Retention +40%",
      color: "text-purple-400"
    },
    {
      title: "Inventory Management",
      description: "Tracking stok real-time dengan notifikasi otomatis dan forecasting cerdas",
      icon: CheckCircle,
      stats: "0% Stock Out",
      color: "text-emerald-400"
    },
    {
      title: "24/7 Support",
      description: "Tim support siap membantu kapan saja dengan response time rata-rata 2 menit",
      icon: Clock,
      stats: "2 Menit Response",
      color: "text-orange-400"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10 p-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Coffee className="h-8 w-8 text-primary-400" />
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                    Demo Live
                  </span>
                  <p className="text-xs text-gray-300">Warkop Smart POS</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                  Mulai Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Demo Live
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Warkop Smart POS
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Rasakan pengalaman langsung sistem kasir digital terdepan untuk warung kopi modern
            </p>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm">
              <Play className="h-4 w-4 mr-2" />
              Demo Interaktif Tersedia
            </Badge>
          </div>
        </div>
      </section>

      {/* Demo Navigation */}
      <section className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {demoSections.map((section) => (
              <Card
                key={section.id}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                  activeDemo === section.id
                    ? 'border-primary-400 bg-white/20'
                    : 'border-white/20 bg-white/10 hover:bg-white/15'
                } backdrop-blur-md`}
                onClick={() => setActiveDemo(section.id)}
              >
                <CardHeader className="text-center p-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{section.title}</CardTitle>
                  <CardDescription className="text-gray-300">{section.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader className="text-center p-8">
              <CardTitle className="text-2xl font-bold text-white mb-4">
                Preview: {demoSections.find(s => s.id === activeDemo)?.title}
              </CardTitle>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 border border-gray-700">
                <div className="text-center text-gray-300 space-y-4">
                  <div className="text-6xl mb-4">
                    {activeDemo === "pos" && "🛒"}
                    {activeDemo === "analytics" && "📊"}
                    {activeDemo === "menu" && "☕"}
                    {activeDemo === "customers" && "👥"}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {activeDemo === "pos" && "Kasir Digital Super Cepat"}
                    {activeDemo === "analytics" && "Dashboard Analytics Real-time"}
                    {activeDemo === "menu" && "Menu Management Pintar"}
                    {activeDemo === "customers" && "Customer Loyalty System"}
                  </h3>
                  <p className="text-gray-400">
                    {activeDemo === "pos" && "Proses transaksi hanya 3 detik dengan interface yang intuitif"}
                    {activeDemo === "analytics" && "Laporan penjualan real-time dengan visualisasi yang memukau"}
                    {activeDemo === "menu" && "Kelola menu dengan drag & drop, foto berkualitas tinggi"}
                    {activeDemo === "customers" && "Sistem poin otomatis dan member card digital"}
                  </p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <Link href="/login">
                      <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white">
                        Coba Sekarang
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Features Detail */}
      <section className="relative z-10 py-16 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Keunggulan Terbukti
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fitur-fitur revolusioner yang telah terbukti meningkatkan performa bisnis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105"
              >
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color === 'text-yellow-400' ? 'from-yellow-400 to-orange-500' : 
                      feature.color === 'text-green-400' ? 'from-green-400 to-emerald-500' :
                      feature.color === 'text-blue-400' ? 'from-blue-400 to-cyan-500' :
                      feature.color === 'text-purple-400' ? 'from-purple-400 to-pink-500' :
                      feature.color === 'text-emerald-400' ? 'from-emerald-400 to-teal-500' :
                      'from-orange-400 to-red-500'} flex items-center justify-center`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={`${feature.color} bg-transparent border-current`}>
                      {feature.stats}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="bg-black/40 backdrop-blur-xl border border-white/30 p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">
                Siap Memulai Revolusi?
              </span>
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan warung kopi yang sudah merasakan transformasi digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105 border-0"
                >
                  Mulai Gratis 14 Hari
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 bg-transparent"
                >
                  Login Demo
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
