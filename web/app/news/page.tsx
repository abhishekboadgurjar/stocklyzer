"use client"

import { useState, useEffect } from "react"
import { NewsCard } from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, Filter } from "lucide-react"

interface NewsItem {
  headline: string
  summary: string
  source: string
  datetime: number
  image?: string
  url: string
  category: string
}

const categories = ["All", "Technology", "Finance", "Healthcare", "Energy", "Consumer", "Industrial"]

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock news data
    const mockNews: NewsItem[] = [
      {
        headline: "Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty",
        summary:
          "The Federal Reserve indicated it may consider cutting interest rates in the coming months as economic indicators show mixed signals about the health of the U.S. economy.",
        source: "Reuters",
        datetime: Math.floor(Date.now() / 1000) - 3600,
        image: "/placeholder.svg?height=60&width=80",
        url: "#",
        category: "Finance",
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
        headline: "Healthcare Sector Shows Resilience Despite Market Volatility",
        summary:
          "Healthcare stocks have demonstrated remarkable stability this quarter, with several pharmaceutical companies reporting strong earnings and promising drug pipeline developments.",
        source: "Wall Street Journal",
        datetime: Math.floor(Date.now() / 1000) - 10800,
        image: "/placeholder.svg?height=60&width=80",
        url: "#",
        category: "Healthcare",
      },
      {
        headline: "Energy Sector Faces Headwinds as Oil Prices Fluctuate",
        summary:
          "Energy companies are navigating challenging market conditions as crude oil prices experience significant volatility due to geopolitical tensions and changing demand patterns.",
        source: "CNBC",
        datetime: Math.floor(Date.now() / 1000) - 14400,
        image: "/placeholder.svg?height=60&width=80",
        url: "#",
        category: "Energy",
      },
      {
        headline: "Consumer Spending Patterns Shift as Inflation Concerns Persist",
        summary:
          "Recent data shows consumers are adjusting their spending habits, with increased focus on essential goods and services while discretionary spending remains cautious.",
        source: "Financial Times",
        datetime: Math.floor(Date.now() / 1000) - 18000,
        image: "/placeholder.svg?height=60&width=80",
        url: "#",
        category: "Consumer",
      },
      {
        headline: "Industrial Automation Drives Manufacturing Sector Growth",
        summary:
          "Manufacturing companies are investing heavily in automation technologies, leading to improved efficiency and stronger financial performance across the industrial sector.",
        source: "MarketWatch",
        datetime: Math.floor(Date.now() / 1000) - 21600,
        image: "/placeholder.svg?height=60&width=80",
        url: "#",
        category: "Industrial",
      },
    ]

    setTimeout(() => {
      setNews(mockNews)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredNews = selectedCategory === "All" ? news : news.filter((item) => item.category === selectedCategory)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Newspaper className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Financial News</h1>
        </div>
        <p className="text-muted-foreground">Stay updated with the latest financial news and market developments</p>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter by Category</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* News Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {selectedCategory === "All" ? "Latest News" : `${selectedCategory} News`}
          </h2>
          <Badge variant="secondary">{filteredNews.length} articles</Badge>
        </div>

        {filteredNews.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No news articles found for this category.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        )}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Articles
        </Button>
      </div>
    </div>
  )
}
