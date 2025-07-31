"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  AreaChart,
} from "recharts"
import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Volume2, BarChart3, Activity, Zap } from "lucide-react"

interface ChartData {
  timestamp: number
  price: number
  volume: number
  high: number
  low: number
  open: number
  close: number
  date: string
  sma20: number
  sma50: number
  rsi: number
}

interface EnhancedStockChartProps {
  symbol: string
  data?: ChartData[]
}

const timeRanges = [
  { label: "1D", value: "1D", resolution: "5m" },
  { label: "1W", value: "1W", resolution: "1h" },
  { label: "1M", value: "1M", resolution: "1D" },
  { label: "6M", value: "6M", resolution: "1D" },
  { label: "1Y", value: "1Y", resolution: "1W" },
  { label: "5Y", value: "5Y", resolution: "1M" },
]

const chartTypes = [
  { label: "Line", value: "line", icon: Activity },
  { label: "Area", value: "area", icon: BarChart3 },
  { label: "Volume", value: "volume", icon: Volume2 },
  { label: "Technical", value: "technical", icon: Zap },
]

export function EnhancedStockChart({ symbol, data }: EnhancedStockChartProps) {
  const [selectedRange, setSelectedRange] = useState("1M")
  const [chartType, setChartType] = useState("line")
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)

  useEffect(() => {
    const generateEnhancedMockData = (range: string) => {
      const now = Date.now()
      const points =
        range === "1D"
          ? 78
          : range === "1W"
            ? 168
            : range === "1M"
              ? 30
              : range === "6M"
                ? 180
                : range === "1Y"
                  ? 365
                  : 1825
      const basePrice = 150 + Math.random() * 100
      const volatility = 0.02

      return Array.from({ length: points }, (_, i) => {
        const timestamp = now - (points - i) * (range === "1D" ? 300000 : range === "1W" ? 3600000 : 86400000)
        const trend = Math.sin(i / 20) * 0.1
        const randomWalk = (Math.random() - 0.5) * volatility
        const price = Math.max(basePrice * (1 + trend + randomWalk * Math.sqrt(i + 1)), 10)

        const high = price * (1 + Math.random() * 0.02)
        const low = price * (1 - Math.random() * 0.02)
        const volume = Math.floor(Math.random() * 10000000) + 1000000

        // Technical indicators
        const sma20 = price * (0.98 + Math.random() * 0.04)
        const sma50 = price * (0.96 + Math.random() * 0.08)
        const rsi = 30 + Math.random() * 40

        return {
          timestamp,
          price: Number(price.toFixed(2)),
          volume,
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          open: Number((price * (0.99 + Math.random() * 0.02)).toFixed(2)),
          close: Number(price.toFixed(2)),
          date: new Date(timestamp).toLocaleDateString(),
          sma20: Number(sma20.toFixed(2)),
          sma50: Number(sma50.toFixed(2)),
          rsi: Number(rsi.toFixed(1)),
        }
      })
    }

    setLoading(true)
    setTimeout(() => {
      const newData = data || generateEnhancedMockData(selectedRange)
      setChartData(newData)

      if (newData.length > 0) {
        const latest = newData[newData.length - 1]
        const previous = newData[newData.length - 2]
        setCurrentPrice(latest.price)
        setPriceChange(latest.price - (previous?.price || latest.price))
      }

      setLoading(false)
    }, 800)
  }, [selectedRange, data])

  const formatTooltipValue = (value: number, name: string) => {
    if (name === "volume") return [value.toLocaleString(), "Volume"]
    if (name === "rsi") return [`${value}`, "RSI"]
    return [`$${value.toFixed(2)}`, name === "price" ? "Price" : name.toUpperCase()]
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.name === "volume" ? entry.value.toLocaleString() : `$${entry.value.toFixed(2)}`}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
                domain={["dataMin - 5", "dataMax + 5"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case "volume":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis
                yAxisId="price"
                orientation="right"
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                yAxisId="volume"
                orientation="left"
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar yAxisId="volume" dataKey="volume" fill="hsl(var(--muted))" opacity={0.6} />
              <Line
                yAxisId="price"
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )

      case "technical":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
                domain={["dataMin - 5", "dataMax + 5"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                name="Price"
              />
              <Line
                type="monotone"
                dataKey="sma20"
                stroke="hsl(var(--chart-2))"
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="5 5"
                name="SMA 20"
              />
              <Line
                type="monotone"
                dataKey="sma50"
                stroke="hsl(var(--chart-3))"
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="10 5"
                name="SMA 50"
              />
            </LineChart>
          </ResponsiveContainer>
        )

      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
                domain={["dataMin - 5", "dataMax + 5"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "hsl(var(--background))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  if (loading) {
    return (
      <Card className="hover-lift">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-32 shimmer"></div>
              <div className="h-4 bg-muted rounded w-24 shimmer"></div>
            </div>
            <div className="flex space-x-1">
              {timeRanges.map((range) => (
                <div key={range.value} className="h-8 w-12 bg-muted rounded shimmer"></div>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted rounded shimmer"></div>
        </CardContent>
      </Card>
    )
  }

  const isPositive = priceChange >= 0

  return (
    <Card className="hover-lift animate-slide-up">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">{symbol} Price Chart</CardTitle>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold">${currentPrice.toFixed(2)}</span>
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
                  isPositive
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>
                  {isPositive ? "+" : ""}
                  {priceChange.toFixed(2)} ({((priceChange / currentPrice) * 100).toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex space-x-1">
              {timeRanges.map((range) => (
                <Button
                  key={range.value}
                  variant={selectedRange === range.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRange(range.value)}
                  className="transition-all duration-200"
                >
                  {range.label}
                </Button>
              ))}
            </div>

            <div className="flex space-x-1">
              {chartTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Button
                    key={type.value}
                    variant={chartType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType(type.value)}
                    className="transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-96 relative">{renderChart()}</div>

        {chartType === "technical" && (
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 bg-primary"></div>
              <span>Price</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 border-t-2 border-dashed" style={{ borderColor: "hsl(var(--chart-2))" }}></div>
              <span>SMA 20</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-0.5 border-t-2 border-dashed" style={{ borderColor: "hsl(var(--chart-3))" }}></div>
              <span>SMA 50</span>
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">High</p>
            <p className="font-semibold">${Math.max(...chartData.map((d) => d.high)).toFixed(2)}</p>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Low</p>
            <p className="font-semibold">${Math.min(...chartData.map((d) => d.low)).toFixed(2)}</p>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Volume</p>
            <p className="font-semibold">{(chartData[chartData.length - 1]?.volume || 0).toLocaleString()}</p>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">RSI</p>
            <p className="font-semibold">{chartData[chartData.length - 1]?.rsi || 0}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
