"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LayoutDashboard, 
  FolderOpen, 
  Package, 
  Layers, 
  Download, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BarChart3
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/projects", icon: FolderOpen, label: "My Projects" },
  { href: "/dashboard/products", icon: Package, label: "Product Library" },
  { href: "/dashboard/templates", icon: Layers, label: "Shelf Templates" },
  { href: "/dashboard/exports", icon: Download, label: "Exports" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center border-b border-sidebar-border px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link href="/" className="text-xl font-bold text-sidebar-foreground">
              ShelfView<span className="text-sidebar-primary">3D</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  collapsed && "justify-center px-2",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className={cn(
          "border-t border-sidebar-border p-4",
          collapsed && "px-2"
        )}>
          <div className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center"
          )}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                JD
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">Pro Plan</p>
              </div>
            )}
            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
        <div className="min-h-screen bg-muted/30">
          {children}
        </div>
      </main>
    </div>
  )
}
