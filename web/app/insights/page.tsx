"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, BarChart3, Calendar, Search } from "lucide-react"

interface TechnicalIndicator {
  name: string
  value: number
  signal: "Buy" | "Sell" | "Hold"
  description: string
}

interface AnalystRating {
  firm: string
  rating: "Buy" | "Sell" | "Hold"
  targetPrice: number
  date: string
}

interface EarningsData {
  quarter: string
  estimatedEPS: number
  actualEPS?: number
  estimatedRevenue: number
  actualRevenue?: number
  date: string
}

export default function InsightsPage() {
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [technicalIndicators, setTechnicalIndicators] = useState<TechnicalIndicator[]>([])
  const [analystRatings, setAnalystRatings] = useState<AnalystRating[]>([])
  const [earningsData, setEarningsData] = useState<EarningsData[]>([])

  useEffect(() => {
    // Mock data for demonstration
    const mockTechnicalIndicators: TechnicalIndicator[] = [
      {
        name: "RSI (14)",
        value: 65.4,
        signal: "Hold",
        description: "Relative Strength Index indicates moderate momentum",
      },
      {
        name: "MACD",
        value: 2.34,
        signal: "Buy",
        description: "MACD line above signal line suggests bullish momentum",
      },
      {
        name: "Moving Average (50)",
        value: 148.25,
        signal: "Buy",
        description: "Price above 50-day moving average indicates uptrend",
      },
      {
        name: "Bollinger Bands",
        value: 0.75,
        signal: "Hold",
        description: "Price in middle of Bollinger Bands suggests neutral momentum",
      },
    ]

    const mockAnalystRatings: AnalystRating[] = [
      {
        firm: "Goldman Sachs",
        rating: "Buy",
        targetPrice: 185.0,
        date: "2024-01-15",
      },
      {
        firm: "Morgan Stanley",
        rating: "Hold",
        targetPrice: 165.0,
        date: "2024-01-12",
      },
      {
        firm: "JP Morgan",
        rating: "Buy",
        targetPrice: 190.0,
        date: "2024-01-10",
      },
      {
        firm: "Bank of America",
        rating: "Buy",
        targetPrice: 180.0,
        date: "2024-01-08",
      },
    ]

    const mockEarningsData: EarningsData[] = [
      {
        quarter: "Q4 2024",
        estimatedEPS: 2.18,
        actualEPS: 2.25,
        estimatedRevenue: 89500000000,
        actualRevenue: 91200000000,
        date: "2024-01-25",
      },
      {
        quarter: "Q1 2025",
        estimatedEPS: 1.95,
        estimatedRevenue: 85000000000,
        date: "2024-04-25",
      },
      {
        quarter: "Q2 2025",
        estimatedEPS: 2.05,
        estimatedRevenue: 87000000000,
        date: "2024-07-25",
      },
    ]

    setTimeout(() => {
      setTechnicalIndicators(mockTechnicalIndicators)
      setAnalystRatings(mockAnalystRatings)
      setEarningsData(mockEarningsData)
      setLoading(false)
    }, 1000)
  }, [selectedStock])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSelectedStock(searchQuery.toUpperCase())
      setSearchQuery("")
      setLoading(true)
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "Buy":
        return "text-green-600 bg-green-100 dark:bg-green-900"
      case "Sell":
        return "text-red-600 bg-red-100 dark:bg-red-900"
      case "Hold":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900"
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    return `$${value.toFixed(2)}`
  }

  const buyRatings = analystRatings.filter((r) => r.rating === "Buy").length
  const holdRatings = analystRatings.filter((r) => r.rating === "Hold").length
  const sellRatings = analystRatings.filter((r) => r.rating === "Sell").length
  const totalRatings = analystRatings.length

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <BarChart3 className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Market Insights</h1>
        </div>
        <p className="text-muted-foreground">
          Technical indicators, analyst ratings, and earnings data for informed investment decisions
        </p>
      </div>

      {/* Stock Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Stock for Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button type="submit">Analyze</Button>
          </form>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Currently analyzing: <span className="font-semibold">{selectedStock}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Technical Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Technical Indicators</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {technicalIndicators.map((indicator, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{indicator.name}</span>
                  <Badge className={getSignalColor(indicator.signal)}>{indicator.signal}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Value: {indicator.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{indicator.description}</p>
                {index < technicalIndicators.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Analyst Ratings */}
        <Card>
          <CardHeader>
            <CardTitle>Analyst Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating Summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Buy</span>
                <span className="text-sm text-muted-foreground">
                  {buyRatings}/{totalRatings}
                </span>
              </div>
              <Progress value={(buyRatings / totalRatings) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Hold</span>
                <span className="text-sm text-muted-foreground">
                  {holdRatings}/{totalRatings}
                </span>
              </div>
              <Progress value={(holdRatings / totalRatings) * 100} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sell</span>
                <span className="text-sm text-muted-foreground">
                  {sellRatings}/{totalRatings}
                </span>
              </div>
              <Progress value={(sellRatings / totalRatings) * 100} className="h-2" />
            </div>

            {/* Individual Ratings */}
            <div className="space-y-3">
              <h4 className="font-medium">Recent Ratings</h4>
              {analystRatings.slice(0, 3).map((rating, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{rating.firm}</p>
                    <p className="text-xs text-muted-foreground">{rating.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getSignalColor(rating.rating)}>{rating.rating}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Target: ${rating.targetPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Earnings Calendar & Estimates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Quarter</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">EPS Estimate</th>
                  <th className="text-left py-2">EPS Actual</th>
                  <th className="text-left py-2">Revenue Estimate</th>
                  <th className="text-left py-2">Revenue Actual</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {earningsData.map((earnings, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{earnings.quarter}</td>
                    <td className="py-3 text-sm text-muted-foreground">{earnings.date}</td>
                    <td className="py-3">${earnings.estimatedEPS}</td>
                    <td className="py-3">
                      {earnings.actualEPS ? (
                        <span
                          className={earnings.actualEPS > earnings.estimatedEPS ? "text-green-600" : "text-red-600"}
                        >
                          ${earnings.actualEPS}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-3">{formatCurrency(earnings.estimatedRevenue)}</td>
                    <td className="py-3">
                      {earnings.actualRevenue ? (
                        <span
                          className={
                            earnings.actualRevenue > earnings.estimatedRevenue ? "text-green-600" : "text-red-600"
                          }
                        >
                          {formatCurrency(earnings.actualRevenue)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-3">
                      <Badge variant={earnings.actualEPS ? "default" : "secondary"}>
                        {earnings.actualEPS ? "Reported" : "Upcoming"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Technical Analysis</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>2 out of 4 indicators suggest buying opportunity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>RSI indicates moderate momentum levels</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Price trending above key moving averages</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Analyst Consensus</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{Math.round((buyRatings / totalRatings) * 100)}% of analysts recommend buying</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Average target price suggests upside potential</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Recent earnings beat expectations</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
