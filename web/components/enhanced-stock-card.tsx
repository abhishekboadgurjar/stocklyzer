import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Eye } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, ResponsiveContainer } from "recharts"

interface EnhancedStockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume?: number
  marketCap?: number
  sector?: string
}

export function EnhancedStockCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  marketCap,
  sector,
}: EnhancedStockCardProps) {
  const isPositive = change >= 0

  // Generate mini chart data
  const chartData = Array.from({ length: 10 }, (_, i) => ({
    value: price + (Math.random() - 0.5) * price * 0.05,
    index: i,
  }))

  const formatNumber = (num?: number) => {
    if (!num) return "N/A"
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`
    return `$${num.toFixed(2)}`
  }

  return (
    <Link href={`/stock/${symbol}`}>
      <Card
        className={`hover-lift cursor-pointer group relative overflow-hidden transition-all duration-300 ${
          isPositive
            ? "hover:border-green-300 hover:shadow-green-100 dark:hover:shadow-green-900/20"
            : "hover:border-red-300 hover:shadow-red-100 dark:hover:shadow-red-900/20"
        }`}
      >
        {/* Background gradient */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
            isPositive ? "success-gradient" : "danger-gradient"
          }`}
        ></div>

        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-lg font-bold">{symbol}</CardTitle>
                {sector && (
                  <Badge variant="secondary" className="text-xs">
                    {sector}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate max-w-[200px]">{name}</p>
            </div>

            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-2xl font-bold">${price.toFixed(2)}</span>
              <div
                className={`flex items-center space-x-1 text-sm font-medium ${
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}
              >
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>
                  {isPositive ? "+" : ""}
                  {change.toFixed(2)} ({changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* Mini chart */}
            <div className="h-12 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
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
          </div>

          {(volume || marketCap) && (
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t">
              {volume && (
                <div className="flex items-center space-x-1">
                  <Activity className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Vol:</span>
                  <span className="font-medium">{volume.toLocaleString()}</span>
                </div>
              )}
              {marketCap && (
                <div className="flex items-center space-x-1">
                  <span className="text-muted-foreground">MCap:</span>
                  <span className="font-medium">{formatNumber(marketCap)}</span>
                </div>
              )}
            </div>
          )}
        </CardContent>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
      </Card>
    </Link>
  )
}
