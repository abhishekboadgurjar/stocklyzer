"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { LineChart, Line, ResponsiveContainer } from "recharts"

interface IndexData {
  name: string
  symbol: string
  value: number
  change: number
  changePercent: number
  sparklineData: number[]
  volume: string
  marketCap: string
}

export function EnhancedMarketOverview() {
  const [indices, setIndices] = useState<IndexData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateSparklineData = () => {
      return Array.from({ length: 20 }, () => Math.random() * 100 + 50)
    }

    const mockIndices: IndexData[] = [
      {
        name: "NIFTY 50",
        symbol: "^NSEI",
        value: 19674.25,
        change: 125.3,
        changePercent: 0.64,
        sparklineData: generateSparklineData(),
        volume: "₹45,234 Cr",
        marketCap: "₹2,45,67,890 Cr",
      },
      {
        name: "SENSEX",
        symbol: "^BSESN",
        value: 66023.69,
        change: 364.36,
        changePercent: 0.55,
        sparklineData: generateSparklineData(),
        volume: "₹38,567 Cr",
        marketCap: "₹3,12,45,678 Cr",
      },
      {
        name: "NASDAQ",
        symbol: "^IXIC",
        value: 14191.84,
        change: -45.28,
        changePercent: -0.32,
        sparklineData: generateSparklineData(),
        volume: "$156.7B",
        marketCap: "$18.2T",
      },
      {
        name: "S&P 500",
        symbol: "^GSPC",
        value: 4567.89,
        change: 23.45,
        changePercent: 0.52,
        sparklineData: generateSparklineData(),
        volume: "$89.3B",
        marketCap: "$42.1T",
      },
      {
        name: "DOW JONES",
        symbol: "^DJI",
        value: 34567.12,
        change: -89.34,
        changePercent: -0.26,
        sparklineData: generateSparklineData(),
        volume: "$67.8B",
        marketCap: "$28.9T",
      },
      {
        name: "FTSE 100",
        symbol: "^FTSE",
        value: 7456.78,
        change: 34.56,
        changePercent: 0.47,
        sparklineData: generateSparklineData(),
        volume: "£12.4B",
        marketCap: "£2.1T",
      },
    ]

    setTimeout(() => {
      setIndices(mockIndices)
      setLoading(false)
    }, 1200)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-20 shimmer"></div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-8 bg-muted rounded w-32 shimmer"></div>
              <div className="h-4 bg-muted rounded w-24 shimmer"></div>
              <div className="h-12 bg-muted rounded shimmer"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {indices.map((index, i) => {
        const isPositive = index.change >= 0
        return (
          <Card
            key={index.symbol}
            className={`hover-lift animate-slide-up relative overflow-hidden group ${
              isPositive ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800"
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`absolute inset-0 opacity-5 ${isPositive ? "success-gradient" : "danger-gradient"}`}></div>

            <CardHeader className="pb-3 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">{index.name}</CardTitle>
                  <Badge variant="outline" className="text-xs mt-1">
                    {index.symbol}
                  </Badge>
                </div>
                <div
                  className={`p-2 rounded-full ${
                    isPositive ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight">{index.value.toLocaleString()}</div>
                <div
                  className={`flex items-center space-x-2 text-sm font-medium ${
                    isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  <span>
                    {isPositive ? "+" : ""}
                    {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              {/* Mini Sparkline Chart */}
              <div className="h-12 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={index.sparklineData.map((value, i) => ({ value, index: i }))}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={isPositive ? "#10b981" : "#ef4444"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-1">
                  <Activity className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="font-medium">{index.volume}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">MCap:</span>
                  <span className="font-medium">{index.marketCap}</span>
                </div>
              </div>
            </CardContent>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </Card>
        )
      })}
    </div>
  )
}
