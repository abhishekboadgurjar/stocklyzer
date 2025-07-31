import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

interface MarketData {
  indices: {
    nifty: { value: number; change: number; changePercent: number }
    sensex: { value: number; change: number; changePercent: number }
    nasdaq: { value: number; change: number; changePercent: number }
  }
  topGainers: Stock[]
  topLosers: Stock[]
}

interface AppState {
  theme: "light" | "dark" | "system"
  watchlist: Stock[]
  marketData: MarketData | null
  setTheme: (theme: "light" | "dark" | "system") => void
  addToWatchlist: (stock: Stock) => void
  removeFromWatchlist: (symbol: string) => void
  setMarketData: (data: MarketData) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "system",
      watchlist: [],
      marketData: null,
      setTheme: (theme) => set({ theme }),
      addToWatchlist: (stock) => {
        const { watchlist } = get()
        if (!watchlist.find((s) => s.symbol === stock.symbol)) {
          set({ watchlist: [...watchlist, stock] })
        }
      },
      removeFromWatchlist: (symbol) => {
        const { watchlist } = get()
        set({ watchlist: watchlist.filter((s) => s.symbol !== symbol) })
      },
      setMarketData: (data) => set({ marketData: data }),
    }),
    {
      name: "tradrake-storage",
      partialize: (state) => ({
        watchlist: state.watchlist,
        theme: state.theme,
      }),
    },
  ),
)
