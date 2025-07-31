const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || "demo"
const BASE_URL = "https://finnhub.io/api/v1"

export interface StockQuote {
  c: number // Current price
  d: number // Change
  dp: number // Percent change
  h: number // High price of the day
  l: number // Low price of the day
  o: number // Open price of the day
  pc: number // Previous close price
  t: number // Timestamp
}

export interface CompanyProfile {
  country: string
  currency: string
  exchange: string
  ipo: string
  marketCapitalization: number
  name: string
  phone: string
  shareOutstanding: number
  ticker: string
  weburl: string
  logo: string
  finnhubIndustry: string
}

export interface NewsItem {
  category: string
  datetime: number
  headline: string
  id: number
  image: string
  related: string
  source: string
  summary: string
  url: string
}

export interface CandleData {
  c: number[] // Close prices
  h: number[] // High prices
  l: number[] // Low prices
  o: number[] // Open prices
  s: string // Status
  t: number[] // Timestamps
  v: number[] // Volumes
}

class FinnhubAPI {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async fetchData(endpoint: string): Promise<any> {
    const response = await fetch(`${BASE_URL}${endpoint}&token=${this.apiKey}`)
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }
    return response.json()
  }

  async getStockQuote(symbol: string): Promise<StockQuote> {
    return this.fetchData(`/quote?symbol=${symbol}`)
  }

  async getCompanyProfile(symbol: string): Promise<CompanyProfile> {
    return this.fetchData(`/stock/profile2?symbol=${symbol}`)
  }

  async getMarketNews(category = "general"): Promise<NewsItem[]> {
    return this.fetchData(`/news?category=${category}`)
  }

  async getCompanyNews(symbol: string, from: string, to: string): Promise<NewsItem[]> {
    return this.fetchData(`/company-news?symbol=${symbol}&from=${from}&to=${to}`)
  }

  async getCandles(symbol: string, resolution: string, from: number, to: number): Promise<CandleData> {
    return this.fetchData(`/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`)
  }

  async searchSymbol(query: string): Promise<any> {
    return this.fetchData(`/search?q=${query}`)
  }

  async getRecommendationTrends(symbol: string): Promise<any> {
    return this.fetchData(`/stock/recommendation?symbol=${symbol}`)
  }

  async getBasicFinancials(symbol: string): Promise<any> {
    return this.fetchData(`/stock/metric?symbol=${symbol}&metric=all`)
  }
}

export const finnhubAPI = new FinnhubAPI(FINNHUB_API_KEY)
