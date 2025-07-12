"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
// import { Plus, Edit, Trash2, Package, Search, Loader2, Coffee, Utensils } from "lucide-react"

// Types
interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  stock: number
  image: string
  isActive: boolean
}

interface Category {
  id: number
  name: string
}

interface FormData {
  name: string
  price: string
  category: string
  description: string
  stock: string
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    image: ""
  })

  const { toast } = useToast()

  // Sample data for development
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCategories([
        { id: 1, name: "Coffee" },
        { id: 2, name: "Non-Coffee" },
        { id: 3, name: "Food" },
        { id: 4, name: "Snacks" }
      ])
      
      setProducts([
        {
          id: 1,
          name: "Americano",
          price: 15000,
          category: "Coffee",
          description: "Strong black coffee",
          stock: 50,
          image: "/placeholder.jpg",
          isActive: true
        },
        {
          id: 2,
          name: "Cappuccino",
          price: 20000,
          category: "Coffee", 
          description: "Espresso with steamed milk foam",
          stock: 30,
          image: "/placeholder.jpg",
          isActive: true
        },
        {
          id: 3,
          name: "Iced Tea",
          price: 12000,
          category: "Non-Coffee",
          description: "Refreshing iced tea",
          stock: 25,
          image: "/placeholder.jpg",
          isActive: true
        },
        {
          id: 4,
          name: "Croissant",
          price: 18000,
          category: "Food",
          description: "Buttery pastry",
          stock: 15,
          image: "/placeholder.jpg",
          isActive: true
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Form handlers
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      stock: "",
      image: ""
    })
    setEditingProduct(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (editingProduct) {
        // Update existing product
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id 
            ? {
                ...p,
                name: formData.name,
                price: parseFloat(formData.price),
                category: formData.category,
                description: formData.description,
                stock: parseInt(formData.stock),
                image: formData.image
              }
            : p
        ))
        toast({
          title: "Success",
          description: "Product updated successfully"
        })
      } else {
        // Add new product
        const newProduct: Product = {
          id: Date.now(),
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          description: formData.description,
          stock: parseInt(formData.stock),
          image: formData.image || "/placeholder.jpg",
          isActive: true
        }
        setProducts(prev => [...prev, newProduct])
        toast({
          title: "Success",
          description: "Product created successfully"
        })
      }
      
      setDialogOpen(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      stock: product.stock.toString(),
      image: product.image
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setProducts(prev => prev.filter(p => p.id !== id))
      toast({
        title: "Success",
        description: "Product deleted successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      })
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Coffee":
        return <span>☕</span>
      case "Food":
        return <span>🍽️</span>
      default:
        return <span>📦</span>
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", variant: "destructive" as const }
    if (stock < 10) return { text: "Low Stock", variant: "secondary" as const }
    return { text: "In Stock", variant: "default" as const }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="text-2xl">⏳</span>
        <span className="ml-2">Loading products...</span>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your coffee shop menu items</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open: boolean) => {
          setDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              {/* <Plus className="h-4 w-4 mr-2" /> */}
              + Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {editingProduct ? 'Update product details' : 'Create a new product for your menu'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                    placeholder="e.g. Americano"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (Rp)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="1000"
                    value={formData.price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('price', e.target.value)}
                    placeholder="15000"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value: string) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('stock', e.target.value)}
                    placeholder="50"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your product..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50" onClick={() => setDialogOpen(false)}>
                  Cancel
                </button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? <span className="mr-2">⏳</span> : null}
                  {editingProduct ? 'Update' : 'Create'} Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <span>📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <span>📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.isActive).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <span>📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.stock < 10).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <span>📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📦</span>
            Product Inventory
          </CardTitle>
          <CardDescription>
            Manage your coffee shop menu items and inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <span className="absolute left-3 top-3 text-gray-400">🔍</span>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock)
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                              {getCategoryIcon(product.category)}
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">{product.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">{product.category}</span>
                        </TableCell>
                        <TableCell>Rp {product.price.toLocaleString()}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${stockStatus.variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : stockStatus.variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'}`}>{stockStatus.text}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" onClick={() => handleEdit(product)}>
                              <span>✏️</span>
                            </button>
                            <button className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(product.id)}>
                              <span>🗑️</span>
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
