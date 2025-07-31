"use client"

import { useAppStore } from "@/lib/store"
import { StockCard } from "@/components/stock-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist } = useAppStore()

  const totalValue = watchlist.reduce((sum, stock) => sum + stock.price, 0)
  const totalChange = watchlist.reduce((sum, stock) => sum + stock.change, 0)
  const avgChangePercent =
    watchlist.length > 0 ? watchlist.reduce((sum, stock) => sum + stock.changePercent, 0) / watchlist.length : 0

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="h-8 w-8 text-red-500" />
          <h1 className="text-3xl font-bold">My Watchlist</h1>
        </div>
        <p className="text-muted-foreground">
          Track your favorite stocks and monitor their performance with Stocklyzer
        </p>
      </div>

      {watchlist.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Change</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalChange >= 0 ? "+" : ""}${totalChange.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Change %</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold flex items-center space-x-1 ${avgChangePercent >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                <TrendingUp className="h-5 w-5" />
                <span>
                  {avgChangePercent >= 0 ? "+" : ""}
                  {avgChangePercent.toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {watchlist.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start building your watchlist by adding stocks you want to analyze
            </p>
            <div className="space-y-4">
              <Link href="/charts">
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Explore Stocks</span>
                </Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                <p>You can add stocks to your watchlist by:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Visiting individual stock pages</li>
                  <li>• Using the search bar in the navigation</li>
                  <li>• Browsing the charts page</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Stocks ({watchlist.length})</h2>
            <Link href="/charts">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Plus className="h-4 w-4" />
                <span>Add More</span>
              </Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {watchlist.map((stock) => (
              <div key={stock.symbol} className="relative">
                <StockCard {...stock} />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => removeFromWatchlist(stock.symbol)}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
