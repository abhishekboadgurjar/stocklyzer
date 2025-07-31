"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, BarChart3, Search, Menu, X, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/charts", label: "Charts", icon: "📊" },
  { href: "/news", label: "News", icon: "📰" },
  { href: "/watchlist", label: "Watchlist", icon: "❤️" },
  { href: "/insights", label: "Insights", icon: "🔍" },
  { href: "/about", label: "About", icon: "ℹ️" },
]

export function EnhancedNavbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/stock/${searchQuery.toUpperCase()}`)
      setSearchQuery("")
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-xl shadow-lg" : "bg-background/80 backdrop-blur-xl"
      } supports-[backdrop-filter]:bg-background/60`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <BarChart3 className="h-8 w-8 text-primary group-hover:scale-110 transition-all duration-300 animate-float" />
                <Sparkles className="h-3 w-3 text-primary absolute -top-1 -right-1 animate-ping" />
                <TrendingUp className="h-2 w-2 text-green-400 absolute -bottom-1 -left-1 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold animate-gradient-text">Stocklyzer</span>
                <Badge variant="secondary" className="text-xs px-1 py-0 h-4 animate-pulse-slow">
                  Pro
                </Badge>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 animate-slide-in-left ${
                    pathname === item.href
                      ? "text-primary border-b-2 border-primary pb-1 animate-glow"
                      : "text-muted-foreground"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="animate-wave">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors animate-pulse" />
                <Input
                  placeholder="Search stocks... (e.g., AAPL)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all duration-300 hover:shadow-lg focus:shadow-xl"
                />
              </div>
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 animate-rotate-in"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:scale-110 transition-transform duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 animate-rotate-in" />
              ) : (
                <Menu className="h-5 w-5 animate-scale-in" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur-xl animate-slide-up">
            <div className="px-4 py-4 space-y-4">
              <form onSubmit={handleSearch} className="md:hidden">
                <div className="relative group">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full transition-all duration-300 focus:shadow-lg"
                  />
                </div>
              </form>

              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 animate-bounce-in ${
                      pathname === item.href ? "bg-primary text-primary-foreground animate-glow" : "hover:bg-muted"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="animate-heartbeat">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
