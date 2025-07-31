"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EnhancedStockChart } from "@/components/enhanced-stock-chart"
import { Search } from "lucide-react"

const popularStocks = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "NFLX"]

export default function ChartsPage() {
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSelectedStock(searchQuery.toUpperCase())
      setSearchQuery("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Interactive Charts</h1>
        <p className="text-muted-foreground">
          Analyze stock price movements with interactive charts and multiple time intervals
        </p>
      </div>

      {/* Search and Stock Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Stock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Button type="submit">Search</Button>
          </form>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Popular stocks:</p>
            <div className="flex flex-wrap gap-2">
              {popularStocks.map((stock) => (
                <Button
                  key={stock}
                  variant={selectedStock === stock ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStock(stock)}
                >
                  {stock}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Display */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">{selectedStock} Advanced Analysis</h2>
        <EnhancedStockChart symbol={selectedStock} />
      </div>

      {/* Chart Information */}
      <Card>
        <CardHeader>
          <CardTitle>Chart Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Time Intervals</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 1D - Hourly data points</li>
                <li>• 1W - Daily data points</li>
                <li>• 1M - Daily data points</li>
                <li>• 6M - Daily data points</li>
                <li>• 1Y - Daily data points</li>
                <li>• 5Y - Weekly data points</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Chart Controls</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Click time range buttons to switch intervals</li>
                <li>• Hover over the chart to see detailed values</li>
                <li>• Use the search bar to analyze any stock</li>
                <li>• Click popular stocks for quick access</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
