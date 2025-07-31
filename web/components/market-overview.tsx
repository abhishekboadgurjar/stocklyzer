"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface IndexData {
  name: string
  symbol: string
  value: number
  change: number
  changePercent: number
}

export function MarketOverview() {
  const [indices, setIndices] = useState<IndexData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration
    const mockIndices: IndexData[] = [
      {
        name: "NIFTY 50",
        symbol: "^NSEI",
        value: 19674.25,
        change: 125.3,
        changePercent: 0.64,
      },
      {
        name: "SENSEX",
        symbol: "^BSESN",
        value: 66023.69,
        change: 364.36,
        changePercent: 0.55,
      },
      {
        name: "NASDAQ",
        symbol: "^IXIC",
        value: 14191.84,
        change: -45.28,
        changePercent: -0.32,
      },
    ]

    setTimeout(() => {
      setIndices(mockIndices)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-20"></div>
            </CardHeader>
            <CardContent>
              <div className="h-6 bg-muted rounded w-24 mb-2"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {indices.map((index) => {
        const isPositive = index.change >= 0
        return (
          <Card key={index.symbol}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{index.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
                <div className={`flex items-center space-x-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {isPositive ? "+" : ""}
                    {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
