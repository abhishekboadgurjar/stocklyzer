import { EnhancedMarketOverview } from "@/components/enhanced-market-overview"
import { EnhancedStockCard } from "@/components/enhanced-stock-card"
import { NewsCard } from "@/components/news-card"
import { AnimatedBackground } from "@/components/animated-background"
import { TrendingUp, TrendingDown, Newspaper, BarChart3, Activity, Zap, Star, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stocklyzer - Market Overview & Financial News",
  description: "Stay updated with real-time market data, top gainers, losers, and latest financial news.",
}

// Enhanced mock data with more details
const topGainers = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 5.67,
    changePercent: 3.34,
    volume: 89234567,
    marketCap: 2800000000000,
    sector: "Technology",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 338.11,
    change: 8.92,
    changePercent: 2.71,
    volume: 45678901,
    marketCap: 2500000000000,
    sector: "Technology",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 125.37,
    change: 2.84,
    changePercent: 2.32,
    volume: 34567890,
    marketCap: 1600000000000,
    sector: "Technology",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.5,
    change: 12.3,
    changePercent: 5.21,
    volume: 78901234,
    marketCap: 800000000000,
    sector: "Automotive",
  },
]

const topLosers = [
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 298.58,
    change: -8.42,
    changePercent: -2.74,
    volume: 56789012,
    marketCap: 750000000000,
    sector: "Technology",
  },
  {
    symbol: "NFLX",
    name: "Netflix, Inc.",
    price: 432.84,
    change: -12.16,
    changePercent: -2.73,
    volume: 23456789,
    marketCap: 190000000000,
    sector: "Entertainment",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 421.13,
    change: -9.87,
    changePercent: -2.29,
    volume: 67890123,
    marketCap: 1000000000000,
    sector: "Technology",
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 112.21,
    change: -4.79,
    changePercent: -4.09,
    volume: 45678901,
    marketCap: 180000000000,
    sector: "Technology",
  },
]

const latestNews = [
  {
    headline: "Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty",
    summary:
      "The Federal Reserve indicated it may consider cutting interest rates in the coming months as economic indicators show mixed signals about the health of the U.S. economy.",
    source: "Reuters",
    datetime: Math.floor(Date.now() / 1000) - 3600,
    image: "/placeholder.svg?height=60&width=80",
    url: "#",
    category: "Economy",
  },
  {
    headline: "Tech Stocks Rally as AI Investment Continues to Surge",
    summary:
      "Major technology companies saw significant gains today as investors remain optimistic about artificial intelligence developments and their potential impact on future earnings.",
    source: "Bloomberg",
    datetime: Math.floor(Date.now() / 1000) - 7200,
    image: "/placeholder.svg?height=60&width=80",
    url: "#",
    category: "Technology",
  },
  {
    headline: "Oil Prices Fluctuate Amid Geopolitical Tensions",
    summary:
      "Crude oil prices experienced volatility this week as geopolitical tensions in key oil-producing regions continue to impact global supply chains.",
    source: "CNBC",
    datetime: Math.floor(Date.now() / 1000) - 10800,
    image: "/placeholder.svg?height=60&width=80",
    url: "#",
    category: "Commodities",
  },
]

const marketStats = [
  { label: "Market Cap", value: "$45.2T", change: "+2.3%", positive: true },
  { label: "Volume", value: "$234.5B", change: "+5.7%", positive: true },
  { label: "Active Stocks", value: "4,567", change: "-1.2%", positive: false },
  { label: "Sectors Up", value: "8/11", change: "+12.5%", positive: true },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 space-y-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-3 bg-primary/10 px-6 py-3 rounded-full animate-bounce-in">
            <Target className="h-6 w-6 text-primary animate-spin-slow" />
            <span className="text-sm font-medium text-primary animate-pulse">Advanced Stock Analysis</span>
            <Zap className="h-4 w-4 text-yellow-500 animate-ping" />
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight animate-gradient-text animate-scale-in">
              Welcome to Stocklyzer
            </h1>
            <div
              className="flex items-center justify-center space-x-2 animate-slide-up"
              style={{ animationDelay: "0.5s" }}
            >
              <Star className="h-5 w-5 text-yellow-500 animate-spin" />
              <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
              <Star className="h-5 w-5 text-yellow-500 animate-spin" style={{ animationDirection: "reverse" }} />
            </div>
          </div>

          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            Your comprehensive stock analysis platform. Analyze market trends, track performance, and make informed
            decisions with
            <span className="text-primary font-semibold animate-pulse"> real-time market data</span> and
            <span className="text-primary font-semibold animate-pulse"> advanced analytics</span>.
          </p>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "1s" }}>
          {marketStats.map((stat, index) => (
            <Card
              key={index}
              className="hover-lift glass-effect animate-bounce-in"
              style={{ animationDelay: `${1.2 + index * 0.1}s` }}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold animate-number-counter">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div
                  className={`text-xs font-medium animate-wiggle ${stat.positive ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Overview */}
        <section className="space-y-6 animate-slide-up" style={{ animationDelay: "1.5s" }}>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-lg animate-float">
              <BarChart3 className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold animate-slide-in-left">Market Overview</h2>
            <Badge variant="secondary" className="animate-ping-slow">
              Live
            </Badge>
          </div>
          <EnhancedMarketOverview />
        </section>

        {/* Top Gainers and Losers */}
        <div className="grid lg:grid-cols-2 gap-12">
          <section className="space-y-6 animate-slide-in-left" style={{ animationDelay: "2s" }}>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg animate-heartbeat">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold">Top Gainers</h2>
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 animate-pulse">
                {topGainers.length} stocks
              </Badge>
            </div>
            <div className="grid gap-4">
              {topGainers.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className="animate-slide-up"
                  style={{ animationDelay: `${2.2 + index * 0.1}s` }}
                >
                  <EnhancedStockCard {...stock} />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 animate-slide-in-right" style={{ animationDelay: "2s" }}>
            <div className="flex items-center space-x-3">
              <div
                className="p-3 bg-red-100 dark:bg-red-900 rounded-lg animate-heartbeat"
                style={{ animationDelay: "0.5s" }}
              >
                <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-3xl font-bold">Top Losers</h2>
              <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 animate-pulse">
                {topLosers.length} stocks
              </Badge>
            </div>
            <div className="grid gap-4">
              {topLosers.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className="animate-slide-up"
                  style={{ animationDelay: `${2.2 + index * 0.1}s` }}
                >
                  <EnhancedStockCard {...stock} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Latest News */}
        <section className="space-y-6 animate-fade-in" style={{ animationDelay: "2.5s" }}>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg animate-float">
              <Newspaper className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold animate-slide-in-left">Latest Financial News</h2>
            <Badge variant="outline" className="animate-ping-slow">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              Breaking
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((news, index) => (
              <div
                key={index}
                className="animate-bounce-in hover-tilt"
                style={{ animationDelay: `${2.7 + index * 0.15}s` }}
              >
                <NewsCard {...news} />
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 animate-scale-in" style={{ animationDelay: "3s" }}>
          <Card className="max-w-2xl mx-auto market-gradient text-white hover-lift animate-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 animate-typewriter">Ready to Analyze Stocks?</h3>
              <p className="text-white/90 mb-6 animate-fade-in" style={{ animationDelay: "3.5s" }}>
                Join thousands of investors who trust Stocklyzer for their market analysis and investment decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 animate-bounce-in"
                  style={{ animationDelay: "4s" }}
                >
                  📊 Advanced Analytics
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 animate-bounce-in"
                  style={{ animationDelay: "4.2s" }}
                >
                  🎯 Smart Insights
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 animate-bounce-in"
                  style={{ animationDelay: "4.4s" }}
                >
                  📈 Real-time Data
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
