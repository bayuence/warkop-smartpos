"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee, Eye, EyeOff, User, Mail, Lock, Sparkles, ArrowRight, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registrasi gagal")
      }

      toast({
        title: "🎉 Registrasi berhasil!",
        description: "Akun Anda telah dibuat. Selamat datang!",
      })

      // Auto login after registration
      localStorage.setItem("user", JSON.stringify(data.user))
      router.push("/menu")
    } catch (error: any) {
      toast({
        title: "❌ Registrasi gagal",
        description: error.message || "Terjadi kesalahan saat registrasi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-coffee-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8 animate-bounce-in">
            <div className="relative inline-block">
              <Coffee className="h-16 w-16 mx-auto mb-4 text-primary-400" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Bergabung dengan Kami
            </h1>
            <p className="text-gray-400 mt-2">Daftar dan nikmati pengalaman digital terbaik</p>
          </div>

          {/* Register Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                  <Label htmlFor="name" className="text-white font-medium">
                    Nama Lengkap
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-12 h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="animate-slide-in-left" style={{ animationDelay: "0.4s" }}>
                  <Label htmlFor="email" className="text-white font-medium">
                    Email
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-12 h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="animate-slide-in-left" style={{ animationDelay: "0.6s" }}>
                  <Label htmlFor="password" className="text-white font-medium">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 6 karakter"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-12 pr-12 h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-primary-400 focus:ring-primary-400/20 transition-all duration-300"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 hover:bg-white/10 text-gray-400 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary-500/25 animate-slide-in-left"
                style={{ animationDelay: "0.8s" }}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Membuat akun...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Daftar Sekarang</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "1s" }}>
              <p className="text-gray-400">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                  Masuk sekarang
                </Link>
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-3 animate-fade-in" style={{ animationDelay: "1.2s" }}>
              {["🎯 Akses menu digital interaktif", "⚡ Pemesanan super cepat", "🎁 Program loyalitas eksklusif"].map(
                (benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
