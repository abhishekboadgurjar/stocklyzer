# Stocklyzer Web Platform

A modern, comprehensive stock market analysis web application built with Next.js 14, providing real-time market data, interactive charts, financial news, and investment insights with a beautiful, responsive design.

## 🌟 Features

- **📊 Real-time Market Data**: Live stock prices, indices, and comprehensive market overview
- **📈 Interactive Charts**: Customizable price charts with multiple time intervals and technical indicators
- **📰 Financial News**: Latest market news categorized by sectors with real-time updates
- **⭐ Personal Watchlist**: Track favorite stocks with persistent storage and portfolio management
- **🔍 Market Insights**: Technical indicators, analyst ratings, earnings data, and investment recommendations
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🌙 Dark Mode**: Toggle between light and dark themes with system preference detection
- **✨ Advanced Animations**: Smooth transitions, micro-interactions, and engaging visual effects
- **🔔 Real-time Notifications**: Price alerts and market updates
- **📊 Portfolio Analytics**: Performance tracking and portfolio analysis tools

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **API**: Finnhub API
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Theming**: next-themes
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Finnhub API key (free at https://finnhub.io/)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-username/stocklyzer.git
cd stocklyzer
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

4. Add your Finnhub API key to `.env.local`:
\`\`\`env
NEXT_PUBLIC_FINNHUB_API_KEY=your_api_key_here
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
stocklyzer/
├── app/                    # Next.js app directory
│   ├── (pages)/           # Route pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── enhanced-navbar.tsx # Navigation component
│   ├── enhanced-stock-card.tsx # Stock display card
│   └── ...
├── lib/                  # Utility functions
│   ├── api.ts           # API integration
│   ├── store.ts         # Zustand store
│   └── utils.ts         # Helper functions
└── public/              # Static assets
\`\`\`

## API Integration

Stocklyzer uses the Finnhub API for financial data. Key endpoints include:

- Stock quotes and real-time prices
- Historical price data for charts
- Company profiles and fundamentals
- Financial news and market updates
- Technical indicators and analyst ratings

## Features Overview

### Homepage
- Market indices (NIFTY, SENSEX, NASDAQ)
- Top gainers and losers
- Latest financial news
- Market overview cards
- Animated background with floating particles

### Stock Detail Pages
- Real-time price and change data
- Interactive price charts with multiple chart types
- Company information and statistics
- Related news and analysis
- Add/remove from watchlist

### Charts Page
- Interactive stock charts
- Multiple time intervals (1D, 1W, 1M, 6M, 1Y, 5Y)
- Different chart types (Line, Area, Volume, Technical)
- Search functionality
- Popular stocks quick access

### News Page
- Latest financial news
- Category filtering
- Source attribution
- Responsive card layout

### Watchlist
- Personal stock tracking
- Persistent storage with Zustand
- Portfolio overview
- Quick access to tracked stocks

### Market Insights
- Technical indicators (RSI, MACD, Moving Averages)
- Analyst recommendations
- Earnings calendar and estimates
- Investment insights summary

## Animation Features

Stocklyzer includes extensive animations for enhanced user experience:

- **Page Transitions**: Smooth fade-in and slide-up animations
- **Hover Effects**: Lift, tilt, and scale transformations
- **Loading States**: Shimmer effects and skeleton screens
- **Micro-interactions**: Button hover states, icon animations
- **Background Elements**: Floating particles and morphing shapes
- **Text Animations**: Gradient text, typewriter effects
- **Chart Animations**: Smooth data transitions and updates

## Customization

### Adding New Features
1. Create new components in `/components`
2. Add new pages in `/app`
3. Update the navigation in `components/enhanced-navbar.tsx`
4. Extend the Zustand store in `lib/store.ts` if needed

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `app/globals.css` for global styles and animations
- Use Tailwind classes for component styling

### API Integration
- Extend `lib/api.ts` for new endpoints
- Add error handling and loading states
- Implement caching for better performance

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

Stocklyzer is for informational purposes only. This is not financial advice. Always consult with a qualified financial advisor before making investment decisions.

## Support

For support, email support@stocklyzer.com or create an issue on GitHub.
\`\`\`

```plaintext file=".env.local"
# Finnhub API Configuration
NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key_here

# For production, get your free API key from https://finnhub.io/
# The demo key has limited functionality and rate limits
