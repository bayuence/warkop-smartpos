"use client"

import { useRouter, usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Coffee, LayoutDashboard, ShoppingCart, Package, Users, BarChart3, Settings, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AppSidebarProps {
  user: {
    id: number
    email: string
    name: string
    role: string
  }
}

export function AppSidebar({ user }: AppSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari sistem",
    })
    router.push("/login")
  }

  const menuItems = [
    {
      title: "🏠 Beranda",
      url: "/dashboard",
      icon: LayoutDashboard,
      gradient: "from-purple-500 to-blue-500",
    },
    {
      title: "📋 Daftar Menu",
      url: "/dashboard/products",
      icon: Package,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "📦 Pesanan Masuk",
      url: "/dashboard/pos",
      icon: ShoppingCart,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "👥 Pelanggan",
      url: "/dashboard/customers",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "📊 Laporan",
      url: "/dashboard/reports",
      icon: BarChart3,
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  // Filter menu based on user role
  const filteredMenuItems =
    user.role === "admin" ? menuItems : menuItems.filter((item) => !item.url.includes("reports"))

  return (
    <Sidebar className="border-r border-gray-200/50 glass-effect">
      <SidebarHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Coffee className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Warkop Smart</h2>
            <p className="text-xs text-white/80">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="bg-white/95 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-semibold mb-3">Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-blue-100 transition-all duration-300 rounded-xl mb-2"
                  >
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3 px-4 py-3 rounded-xl group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.gradient || 'from-gray-400 to-gray-500'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user.role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-gray-700 font-semibold mb-3">Administrasi</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard/settings"}
                    className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-100 data-[active=true]:to-blue-100 transition-all duration-300 rounded-xl mb-2"
                  >
                    <a href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Settings className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">⚙️ Pengaturan</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="bg-gradient-to-r from-purple-50 to-blue-50 border-t border-gray-200/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-4 py-3 text-sm">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-300"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
