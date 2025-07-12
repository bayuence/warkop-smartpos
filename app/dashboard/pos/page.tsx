"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface MenuItem {
  id: number
  name: string
  price: number
  category: string
  available: boolean
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface PaymentMethod {
  id: string
  name: string
  type: 'cash' | 'qris'
  icon: string
}

export default function POSPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [loading, setLoading] = useState(true)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [cashAmount, setCashAmount] = useState("")
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  
  const { toast } = useToast()

  const paymentMethods: PaymentMethod[] = [
    { id: 'cash', name: 'Tunai', type: 'cash', icon: '💰' },
    { id: 'qris', name: 'QRIS', type: 'qris', icon: '📱' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setMenuItems([
        { id: 1, name: "Americano", price: 15000, category: "Coffee", available: true },
        { id: 2, name: "Cappuccino", price: 20000, category: "Coffee", available: true },
        { id: 3, name: "Latte", price: 22000, category: "Coffee", available: true },
        { id: 4, name: "Iced Tea", price: 12000, category: "Non-Coffee", available: true },
        { id: 5, name: "Croissant", price: 18000, category: "Food", available: true },
        { id: 6, name: "Sandwich", price: 25000, category: "Food", available: true }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch && item.available
  })

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id))
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const processOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart",
        variant: "destructive"
      })
      return
    }
    setPaymentDialogOpen(true)
  }

  const processPayment = async () => {
    if (!selectedPaymentMethod) return
    
    setPaymentProcessing(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (selectedPaymentMethod.type === 'cash') {
        const cashAmountNum = parseFloat(cashAmount)
        if (cashAmountNum < total) {
          toast({
            title: "Insufficient Amount",
            description: "Cash amount is less than total",
            variant: "destructive"
          })
          setPaymentProcessing(false)
          return
        }
      }
      
      const orderId = `ORD-${Date.now()}`
      const change = selectedPaymentMethod.type === 'cash' ? parseFloat(cashAmount) - total : 0
      
      toast({
        title: "Payment Successful!",
        description: `Order ${orderId} processed.${change > 0 ? ` Change: Rp ${change.toLocaleString()}` : ''}`,
      })
      
      setCartItems([])
      setPaymentDialogOpen(false)
      setSelectedPaymentMethod(null)
      setCashAmount("")
      setCustomerPhone("")
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive"
      })
    } finally {
      setPaymentProcessing(false)
    }
  }

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="modern-spinner"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="fade-in-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Point of Sale
            </h1>
            <p className="text-gray-600 mt-1">Process orders with QRIS and cash payment</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="modern-card modern-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                <span className="text-3xl">☕</span>
                Menu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4 slide-in-right">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-3 text-gray-400 text-xl">🔍</span>
                    <Input
                      placeholder="Search menu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 modern-input"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px] modern-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      <SelectItem value="Coffee">Coffee</SelectItem>
                      <SelectItem value="Non-Coffee">Non-Coffee</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredItems.map((item, index) => (
                    <Card 
                      key={item.id} 
                      className="modern-card cursor-pointer transition-all duration-300 fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-3 flex items-center justify-center">
                          <span className="text-4xl animated-icon">
                            {item.category === 'Coffee' ? '☕' : item.category === 'Food' ? '🍽️' : '🥤'}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              Rp {item.price.toLocaleString()}
                            </span>
                            <Button
                              onClick={() => addToCart(item)}
                              className="gradient-btn px-4 py-2 text-sm"
                            >
                              <span className="mr-1">+</span> Add
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🛒</span>
                Cart ({cartItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Customer Phone (Optional)</Label>
                  <Input
                    placeholder="Enter phone number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  {cartItems.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">Cart is empty</p>
                  ) : (
                    cartItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-gray-500">Rp {item.price.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            className="h-6 w-6 border rounded text-sm hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            className="h-6 w-6 border rounded text-sm hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>Rp {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (10%):</span>
                    <span>Rp {tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>Rp {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Button
                    onClick={processOrder}
                    className="w-full"
                    disabled={cartItems.length === 0}
                  >
                    💳 Process Order
                  </Button>
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="w-full"
                    disabled={cartItems.length === 0}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>💳</span>
              Payment
            </DialogTitle>
            <DialogDescription>
              Select payment method and complete your order
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>Rp {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold">Payment Method</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method)}
                    className={`p-4 border rounded-lg flex flex-col items-center gap-2 hover:bg-gray-50 ${
                      selectedPaymentMethod?.id === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedPaymentMethod?.type === 'cash' && (
              <div className="space-y-2">
                <Label htmlFor="cashAmount">Cash Amount</Label>
                <Input
                  id="cashAmount"
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  placeholder="Enter cash amount"
                />
                {cashAmount && parseFloat(cashAmount) >= total && (
                  <div className="text-sm text-green-600">
                    Change: Rp {(parseFloat(cashAmount) - total).toLocaleString()}
                  </div>
                )}
              </div>
            )}

            {selectedPaymentMethod?.type === 'qris' && (
              <div className="space-y-2">
                <Label>QRIS Code</Label>
                <div className="bg-white p-4 border rounded-lg text-center">
                  <div className="w-48 h-48 bg-gray-200 mx-auto mb-2 rounded-lg flex items-center justify-center">
                    <div className="text-4xl">📱</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Scan this QR code with your payment app
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Amount: Rp {total.toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setPaymentDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={processPayment}
                disabled={!selectedPaymentMethod || paymentProcessing || 
                  (selectedPaymentMethod?.type === 'cash' && (!cashAmount || parseFloat(cashAmount) < total))}
                className="flex-1"
              >
                {paymentProcessing ? <span className="mr-2">⏳</span> : <span className="mr-2">💰</span>}
                {paymentProcessing ? 'Processing...' : 'Complete Payment'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
