import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, Smartphone, Zap, Shield, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
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

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="relative">
                <Coffee className="h-10 w-10 text-primary-400" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Warkop Digital
                </span>
                <p className="text-xs text-gray-300">Smart POS System</p>
              </div>
            </div>
            <div className="flex space-x-4 animate-slide-in-right">
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-primary-500/25 transition-all duration-300">
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent">
                Revolusi Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Warung Kopi Anda
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Sistem kasir digital revolusioner dengan teknologi terdepan yang telah terbukti meningkatkan efisiensi operasional hingga 300% dan kepuasan pelanggan hingga 95%. Transformasi digital yang mengubah cara Anda berbisnis.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-16 px-12 text-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                >
                  <Zap className="h-6 w-6 mr-3" />
                  Mulai Gratis Sekarang
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-12 text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
                >
                  <Smartphone className="h-6 w-6 mr-3" />
                  Lihat Demo Live
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Fitur Revolusioner
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Teknologi revolusioner yang telah membantu 10,000+ warung kopi meningkatkan profit hingga 250% dengan sistem terintegrasi yang mengoptimalkan setiap aspek bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Kasir Super Cepat ⚡",
                description: "Proses transaksi hanya 3 detik dengan interface yang canggih. Barcode scanner otomatis, payment gateway terintegrasi, dan receipt digital yang meningkatkan kecepatan pelayanan 3x lipat.",
                gradient: "from-yellow-400 to-orange-500",
                delay: "0s",
                stats: "3x Lebih Cepat",
              },
              {
                icon: TrendingUp,
                title: "Analytics Real-time 📊",
                description: "Dashboard analytics dengan 50+ metrik bisnis, forecasting otomatis, dan insights mendalam. Pantau penjualan, profit margin, customer behavior, dan tren pasar secara real-time dengan visualisasi yang memukau.",
                gradient: "from-green-400 to-blue-500",
                delay: "0.2s",
                stats: "50+ Metrik Bisnis",
              },
              {
                icon: Shield,
                title: "Keamanan Tingkat Bank 🔒",
                description: "Enkripsi end-to-end AES-256, backup otomatis ke cloud, dan compliance dengan standar PCI-DSS. Data transaksi, customer, dan inventory dilindungi dengan keamanan tingkat perbankan.",
                gradient: "from-purple-400 to-pink-500",
                delay: "0.4s",
                stats: "99.99% Uptime",
              },
              {
                icon: Users,
                title: "Customer Experience 🌟",
                description: "Sistem loyalitas otomatis dengan poin reward, member card digital, personalisasi promosi berbasis algoritma cerdas, dan omnichannel experience yang meningkatkan customer retention hingga 40%.",
                gradient: "from-blue-400 to-cyan-500",
                delay: "0.6s",
                stats: "Retention +40%",
              },
              {
                icon: Coffee,
                title: "Menu Management 🍽️",
                description: "Kelola menu dengan drag & drop editor, foto berkualitas tinggi dengan auto-cropping, pricing dinamis berdasarkan demand, dan inventory tracking real-time untuk optimasi profit maksimal.",
                gradient: "from-amber-400 to-red-500",
                delay: "0.8s",
                stats: "Profit +25%",
              },
              {
                icon: Smartphone,
                title: "Mobile First 📱",
                description: "Aplikasi mobile yang fully responsive dengan offline capability, sync otomatis saat online, dan remote management. Kelola bisnis dari mana saja dengan performa native app.",
                gradient: "from-indigo-400 to-purple-500",
                delay: "1s",
                stats: "24/7 Access",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="group bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl animate-scale-in"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center p-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="mb-4">
                    <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-3">
                      <span className="text-sm font-semibold text-primary-300">{feature.stats}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-primary-500/10 to-accent-500/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Hasil Nyata yang Terbukti
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Data real dari ribuan warung kopi yang menggunakan sistem kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "10,000+",
                label: "Warung Kopi Terdaftar",
                description: "Dipercaya oleh ribuan pemilik usaha",
                icon: Coffee,
                color: "from-amber-400 to-orange-500"
              },
              {
                number: "250%",
                label: "Peningkatan Profit",
                description: "Rata-rata dalam 3 bulan pertama",
                icon: TrendingUp,
                color: "from-green-400 to-emerald-500"
              },
              {
                number: "3x",
                label: "Kecepatan Transaksi",
                description: "Dari 10 detik menjadi 3 detik",
                icon: Zap,
                color: "from-yellow-400 to-red-500"
              },
              {
                number: "95%",
                label: "Kepuasan Pelanggan",
                description: "Rating tinggi dari customer",
                icon: Users,
                color: "from-blue-400 to-purple-500"
              }
            ].map((stat, index) => (
              <Card key={stat.label} className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                <CardHeader className="text-center p-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <h3 className="text-lg font-semibold text-primary-300 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-400">{stat.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Cerita Sukses Pelanggan
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transformasi nyata dari warung kopi yang menggunakan sistem kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Pak Budi",
                business: "Warung Kopi Senja",
                image: "👨‍💼",
                testimonial: "Omzet naik 300% dalam 2 bulan! Sistem kasir yang sangat mudah digunakan dan analytics-nya membantu saya mengoptimalkan menu.",
                stats: "Omzet: +300%"
              },
              {
                name: "Ibu Sari",
                business: "Kopi Nusantara",
                image: "👩‍💼",
                testimonial: "Customer loyalty program-nya luar biasa! Pelanggan jadi lebih sering datang dan repeat order meningkat drastis.",
                stats: "Pelanggan Tetap: +150%"
              },
              {
                name: "Andi",
                business: "Kafe Digital",
                image: "👨‍🍳",
                testimonial: "Fitur mobile app memungkinkan saya mengontrol bisnis dari mana saja. Inventory management yang akurat bantu saya hemat biaya operasional.",
                stats: "Efisiensi: +200%"
              }
            ].map((testimonial, index) => (
              <Card key={testimonial.name} className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105">
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-primary-300">{testimonial.business}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full px-3 py-1 border border-green-500/30">
                      <span className="text-sm font-semibold text-green-300">{testimonial.stats}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed italic">"{testimonial.testimonial}"</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-500/20 to-accent-500/20 backdrop-blur-md rounded-3xl border border-white/20 p-12 animate-bounce-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Siap Transformasi Digital?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan 10,000+ warung kopi yang sudah merasakan revolusi digital dan meningkatkan profit rata-rata 250% dalam 3 bulan pertama
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-16 px-12 text-lg bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white shadow-2xl hover:shadow-primary-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  <ArrowRight className="h-6 w-6 mr-3" />
                  Mulai Revolusi Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-slide-in-left">
              <div className="flex items-center space-x-3 mb-6">
                <Coffee className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Warkop Digital
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolusi digital untuk warung kopi modern di Indonesia dengan teknologi terdepan.
              </p>
            </div>
            {[
              {
                title: "Produk",
                items: ["Kasir Digital", "Analytics", "Mobile App", "API Integration"],
              },
              {
                title: "Dukungan",
                items: ["Dokumentasi", "Tutorial", "24/7 Support", "Community"],
              },
              {
                title: "Perusahaan",
                items: ["Tentang Kami", "Blog", "Karir", "Privacy Policy"],
              },
            ].map((section, index) => (
              <div key={section.title} className="animate-fade-in" style={{ animationDelay: `${0.2 * (index + 1)}s` }}>
                <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 Warkop Digital. Revolusi dimulai dari sini.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
