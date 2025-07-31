import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

export function StockCard({ symbol, name, price, change, changePercent }: StockCardProps) {
  const isPositive = change >= 0

  return (
    <Link href={`/stock/${symbol}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{symbol}</CardTitle>
          <p className="text-xs text-muted-foreground truncate">{name}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">${price.toFixed(2)}</span>
            <div className={`flex items-center space-x-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {isPositive ? "+" : ""}
                {change.toFixed(2)} ({changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
