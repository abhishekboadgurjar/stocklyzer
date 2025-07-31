"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useEffect } from "react"

interface ChartData {
  timestamp: number
  price: number
  date: string
}

interface StockChartProps {
  symbol: string
  data?: ChartData[]
}

const timeRanges = [
  { label: "1D", value: "1D" },
  { label: "1W", value: "1W" },
  { label: "1M", value: "1M" },
  { label: "6M", value: "6M" },
  { label: "1Y", value: "1Y" },
  { label: "5Y", value: "5Y" },
]

export function StockChart({ symbol, data }: StockChartProps) {
  const [selectedRange, setSelectedRange] = useState("1M")
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    // Generate mock data for demonstration
    const generateMockData = (range: string) => {
      const now = Date.now()
      const points =
        range === "1D"
          ? 24
          : range === "1W"
            ? 7
            : range === "1M"
              ? 30
              : range === "6M"
                ? 180
                : range === "1Y"
                  ? 365
                  : 1825
      const basePrice = 150 + Math.random() * 50

      return Array.from({ length: points }, (_, i) => {
        const timestamp = now - (points - i) * (range === "1D" ? 3600000 : 86400000)
        const price = basePrice + (Math.random() - 0.5) * 20 + Math.sin(i / 10) * 10
        return {
          timestamp,
          price: Math.max(price, 10),
          date: new Date(timestamp).toLocaleDateString(),
        }
      })
    }

    setChartData(data || generateMockData(selectedRange))
  }, [selectedRange, data])

  const formatTooltipValue = (value: number) => [`$${value.toFixed(2)}`, "Price"]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Price Chart</CardTitle>
          <div className="flex space-x-1">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={selectedRange === range.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 12 }} domain={["dataMin - 5", "dataMax + 5"]} />
              <Tooltip
                formatter={formatTooltipValue}
                labelStyle={{ color: "var(--foreground)" }}
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
