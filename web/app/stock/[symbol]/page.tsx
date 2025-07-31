"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NewsCard } from "@/components/news-card"
import { Heart, TrendingUp, TrendingDown, Building, Globe, Phone } from "lucide-react"
import { useAppStore } from "@/lib/store"
import Image from "next/image"
import { EnhancedStockChart } from "@/components/enhanced-stock-chart"

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  high52w: number
  low52w: number
  marketCap: number
  pe: number
  eps: number
  dividend: number
}

interface CompanyInfo {
  name: string
  description: string
  industry: string
  sector: string
  website: string
  phone: string
  logo: string
  country: string
  exchange: string
}

export default function StockDetailPage() {
  const params = useParams()
  const symbol = params.symbol as string
  const { addToWatchlist, removeFromWatchlist, watchlist } = useAppStore()

  const [stockData, setStockData] = useState<StockData | null>(null)
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  useEffect(() => {
    setIsInWatchlist(watchlist.some((stock) => stock.symbol === symbol))
  }, [watchlist, symbol])

  useEffect(() => {
    // Mock data for demonstration
    const mockStockData: StockData = {
      symbol: symbol,
      name: `${symbol} Corporation`,
      price: 150.25 + Math.random() * 100,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 10000000),
      high52w: 200.5,
      low52w: 120.3,
      marketCap: 2500000000000,
      pe: 25.4,
      eps: 6.12,
      dividend: 2.4,
    }

    const mockCompanyInfo: CompanyInfo = {
      name: `${symbol} Corporation`,
      description: `${symbol} is a leading technology company that develops innovative solutions for businesses and consumers worldwide.`,
      industry: "Technology",
      sector: "Information Technology",
      website: `https://${symbol.toLowerCase()}.com`,
      phone: "+1-555-0123",
      logo: `/placeholder.svg?height=80&width=80&query=${symbol}+logo`,
      country: "United States",
      exchange: "NASDAQ",
    }

    setTimeout(() => {
      setStockData(mockStockData)
      setCompanyInfo(mockCompanyInfo)
      setLoading(false)
    }, 1000)
  }, [symbol])

  const handleWatchlistToggle = () => {
    if (!stockData) return

    if (isInWatchlist) {
      removeFromWatchlist(symbol)
    } else {
      addToWatchlist({
        symbol: stockData.symbol,
        name: stockData.name,
        price: stockData.price,
        change: stockData.change,
        changePercent: stockData.changePercent,
      })
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-96 bg-muted rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!stockData || !companyInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Stock not found</h1>
          <p className="text-muted-foreground">The stock symbol "{symbol}" could not be found.</p>
        </div>
      </div>
    )
  }

  const isPositive = stockData.change >= 0

  const mockNews = [
    {
      headline: `${symbol} Reports Strong Q4 Earnings, Beats Expectations`,
      summary: `${symbol} announced quarterly earnings that exceeded analyst expectations, driven by strong performance in key business segments.`,
      source: "MarketWatch",
      datetime: Math.floor(Date.now() / 1000) - 3600,
      image: `/placeholder.svg?height=60&width=80&query=${symbol}+earnings`,
      url: "#",
      category: "Earnings",
    },
    {
      headline: `Analysts Upgrade ${symbol} Price Target Following Innovation Announcement`,
      summary: `Several Wall Street analysts have raised their price targets for ${symbol} following the company's latest product innovation announcement.`,
      source: "Yahoo Finance",
      datetime: Math.floor(Date.now() / 1000) - 7200,
      image: `/placeholder.svg?height=60&width=80&query=${symbol}+innovation`,
      url: "#",
      category: "Analysis",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Image
            src={companyInfo.logo || "/placeholder.svg"}
            alt={`${companyInfo.name} logo`}
            width={60}
            height={60}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold">{stockData.symbol}</h1>
            <p className="text-lg text-muted-foreground">{companyInfo.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline">{companyInfo.exchange}</Badge>
              <Badge variant="outline">{companyInfo.sector}</Badge>
            </div>
          </div>
        </div>
        <Button
          onClick={handleWatchlistToggle}
          variant={isInWatchlist ? "default" : "outline"}
          className="flex items-center space-x-2"
        >
          <Heart className={`h-4 w-4 ${isInWatchlist ? "fill-current" : ""}`} />
          <span>{isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}</span>
        </Button>
      </div>

      {/* Price Information */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-2xl font-bold">${stockData.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Change</p>
              <div className={`flex items-center space-x-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="font-semibold">
                  {isPositive ? "+" : ""}
                  {stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="font-semibold">{stockData.volume.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="font-semibold">{formatNumber(stockData.marketCap)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart and News */}
        <div className="lg:col-span-2 space-y-8">
          <EnhancedStockChart symbol={symbol} />

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Related News</h2>
            <div className="space-y-4">
              {mockNews.map((news, index) => (
                <NewsCard key={index} {...news} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5" />
                <span>Company Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Industry</p>
                <p className="font-medium">{companyInfo.industry}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Country</p>
                <p className="font-medium">{companyInfo.country}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={companyInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Website
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{companyInfo.phone}</span>
              </div>
              <p className="text-sm text-muted-foreground">{companyInfo.description}</p>
            </CardContent>
          </Card>

          {/* Key Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">52W High</span>
                <span className="font-medium">${stockData.high52w.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">52W Low</span>
                <span className="font-medium">${stockData.low52w.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">P/E Ratio</span>
                <span className="font-medium">{stockData.pe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">EPS</span>
                <span className="font-medium">${stockData.eps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dividend Yield</span>
                <span className="font-medium">{stockData.dividend}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
