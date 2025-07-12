"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Coffee, Search, ShoppingCart, Plus, Minus, Star, Heart, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  image: string
  popular?: boolean
  rating?: number
  discount?: number
}

interface CartItem extends Product {
  quantity: number
}

export default function MenuPage() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Signature Coffee Blend",
      price: 35000,
      category: "Minuman",
      description: "Racikan kopi premium dengan aroma yang memukau",
      image: "/placeholder.svg?height=300&width=300",
      popular: true,
      rating: 4.9,
      discount: 15,
    },
    {
      id: 2,
      name: "Artisan Latte",
      price: 28000,
      category: "Minuman",
      description: "Latte dengan latte art yang Instagram-worthy",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Cold Brew Paradise",
      price: 32000,
      category: "Minuman",
      description: "Cold brew dengan sentuhan tropical yang menyegarkan",
      image: "/placeholder.svg?height=300&width=300",
      popular: true,
      rating: 4.7,
    },
    {
      id: 4,
      name: "Gourmet Sandwich",
      price: 45000,
      category: "Makanan",
      description: "Sandwich premium dengan bahan-bahan pilihan",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Artisan Pastry",
      price: 25000,
      category: "Cemilan",
      description: "Pastry buatan tangan dengan resep rahasia",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Premium Croissant",
      price: 22000,
      category: "Cemilan",
      description: "Croissant buttery dengan tekstur yang sempurna",
      image: "/placeholder.svg?height=300&width=300",
      popular: true,
      rating: 4.8,
    },
  ])

  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<number[]>([])
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

  const categories = [
    { name: "Semua", icon: "✨", gradient: "from-purple-500 to-pink-500" },
    { name: "Minuman", icon: "☕", gradient: "from-blue-500 to-cyan-500" },
    { name: "Makanan", icon: "🍽️", gradient: "from-orange-500 to-red-500" },
    { name: "Cemilan", icon: "🥐", gradient: "from-yellow-500 to-orange-500" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Semua" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    toast({
      title: "🎉 Ditambahkan!",
      description: `${product.name} berhasil ditambahkan ke keranjang`,
    })
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    } else {
      setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price
      return total + discountedPrice * item.quantity
    }, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount)
  }

  const handleOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "🛒 Keranjang kosong",
        description: "Pilih menu terlebih dahulu",
        variant: "destructive",
      })
      return
    }
    router.push("/table-selection")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4 fade-in-up">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Warkop Smart
                </h1>
                <p className="text-sm text-gray-300">Halo, {user.name}! 👋</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                localStorage.removeItem("user")
                router.push("/login")
              }}
              className="text-white hover:bg-white/10 border border-white/20 transition-all duration-300"
            >
              Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative max-w-md mx-auto slide-in-right">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          <Input
            placeholder="Cari menu favorit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="modern-input pl-12 h-14 text-white placeholder:text-gray-400 text-lg"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex-shrink-0 h-14 px-8 rounded-2xl font-medium transition-all duration-300 animate-slide-in-left ${
                selectedCategory === category.name
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg hover:shadow-xl transform hover:scale-105`
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="mr-3 text-lg">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden rounded-3xl animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=300&width=300"
                  }}
                />
                {product.popular && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 animate-pulse">
                    <Star className="h-3 w-3 mr-1" />
                    Populer
                  </Badge>
                )}
                {product.discount && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                    -{product.discount}%
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/20"
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(product.id) ? "text-red-400 fill-current" : "text-white"}`}
                  />
                </Button>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-white group-hover:text-primary-300 transition-colors">
                      {product.name}
                    </h3>
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.discount ? (
                        <>
                          <span className="text-xl font-bold text-primary-400">
                            {formatCurrency(product.price * (1 - product.discount / 100))}
                          </span>
                          <span className="text-sm text-gray-400 line-through">{formatCurrency(product.price)}</span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-primary-400">{formatCurrency(product.price)}</span>
                      )}
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary-500/25"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Tambah ke Keranjang
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Coffee className="h-20 w-20 mx-auto mb-6 text-gray-400" />
            <p className="text-gray-400 text-xl">Menu tidak ditemukan</p>
          </div>
        )}
      </div>

      {/* Floating Bottom Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-primary-500/90 to-accent-500/90 backdrop-blur-md border-t border-white/20 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg backdrop-blur-md">
                    {getTotalItems()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">Total Pesanan</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(getTotalPrice())}</p>
                  </div>
                </div>
                <Button
                  onClick={handleOrder}
                  className="h-14 px-8 rounded-2xl bg-white text-primary-600 hover:bg-gray-100 font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Pesan Sekarang
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              {/* Cart Items Preview */}
              <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white/10 rounded-2xl p-4 backdrop-blur-md"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-sm text-gray-200">
                        {formatCurrency(item.discount ? item.price * (1 - item.discount / 100) : item.price)} x{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-full p-0 bg-white/20 border-white/30 text-white hover:bg-white/30"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-full p-0 bg-white/20 border-white/30 text-white hover:bg-white/30"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
