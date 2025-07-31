import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { EnhancedNavbar } from "@/components/enhanced-navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stocklyzer - Your Financial Market Companion",
  description: "Track stocks, analyze markets, and stay updated with the latest financial news on Stocklyzer.",
  keywords: "stocks, trading, finance, market, investment, NIFTY, SENSEX, NASDAQ, analysis",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <EnhancedNavbar />
          <main className="min-h-screen bg-background">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
