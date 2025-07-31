import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, TrendingUp, Newspaper, Heart, Target } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Stocklyzer - Your Financial Market Companion",
  description:
    "Learn about Stocklyzer's mission to democratize financial market data and provide comprehensive investment tools.",
}

const features = [
  {
    icon: TrendingUp,
    title: "Real-time Market Data",
    description: "Access live stock prices, market indices, and financial data powered by reliable APIs.",
  },
  {
    icon: BarChart3,
    title: "Interactive Charts",
    description: "Analyze stock performance with customizable charts and multiple time intervals.",
  },
  {
    icon: Newspaper,
    title: "Financial News",
    description: "Stay informed with the latest market news categorized by sectors and companies.",
  },
  {
    icon: Heart,
    title: "Personal Watchlist",
    description: "Track your favorite stocks and monitor their performance in one place.",
  },
  {
    icon: Target,
    title: "Market Insights",
    description: "Get technical indicators, analyst ratings, and earnings data for informed decisions.",
  },
  {
    icon: Users,
    title: "User-Friendly Interface",
    description: "Enjoy a clean, responsive design that works seamlessly across all devices.",
  },
]

const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Zustand", category: "State Management" },
  { name: "Recharts", category: "Visualization" },
  { name: "Finnhub API", category: "Data Source" },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <BarChart3 className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold">About Stocklyzer</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Stocklyzer is your comprehensive stock analysis platform, designed to democratize access to professional-grade
          market data and analysis tools. We believe that everyone should have access to the information needed to make
          informed investment decisions.
        </p>
      </div>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            To empower individual investors with institutional-quality market data, analysis tools, and insights that
            were traditionally available only to professional traders and large financial institutions.
          </p>
          <p>
            We strive to bridge the information gap in financial markets by providing real-time data, comprehensive
            analysis, and user-friendly tools that help both novice and experienced investors make better investment
            decisions.
          </p>
        </CardContent>
      </Card>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Platform Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <feature.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Built With Modern Technology</h2>
        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">{tech.name}</span>
                  <Badge variant="secondary">{tech.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key Benefits */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Why Choose Stocklyzer?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>For Individual Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Access professional-grade market data without expensive subscriptions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>User-friendly interface designed for investors of all experience levels</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Comprehensive analysis tools to support investment decisions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span>Real-time news and market updates to stay informed</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Fast, responsive web application built with modern technologies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Dark mode support for comfortable viewing in any environment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Mobile-responsive design for trading on the go</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Persistent watchlist and preferences across sessions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources & Reliability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Stocklyzer leverages the Finnhub API to provide reliable, real-time financial market data. Finnhub is a
            trusted provider of financial data used by thousands of developers and financial institutions worldwide.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Data Coverage</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Real-time stock quotes and market data</li>
                <li>• Historical price data and charts</li>
                <li>• Company fundamentals and financials</li>
                <li>• Financial news from trusted sources</li>
                <li>• Technical indicators and market sentiment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Market Coverage</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• US stock markets (NYSE, NASDAQ)</li>
                <li>• Major international exchanges</li>
                <li>• Market indices and ETFs</li>
                <li>• Cryptocurrency data</li>
                <li>• Forex and commodities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
        <CardHeader>
          <CardTitle className="text-yellow-800 dark:text-yellow-200">Important Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-700 dark:text-yellow-300">
          <p className="mb-4">
            Stocklyzer is designed for informational and educational purposes only. The platform provides market data,
            analysis tools, and insights to help users make informed investment decisions.
          </p>
          <p className="mb-4">
            <strong>This is not financial advice.</strong> All investment decisions should be made based on your own
            research, risk tolerance, and financial situation. Past performance does not guarantee future results.
          </p>
          <p>
            Please consult with a qualified financial advisor before making any investment decisions. Stocklyzer and its
            creators are not responsible for any financial losses that may result from using this platform.
          </p>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            We're constantly working to improve Stocklyzer and add new features. If you have feedback, suggestions, or
            encounter any issues, we'd love to hear from you.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> support@stocklyzer.com
            </p>
            <p>
              <strong>GitHub:</strong> github.com/stocklyzer/platform
            </p>
            <p>
              <strong>Version:</strong> 1.0.0
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
