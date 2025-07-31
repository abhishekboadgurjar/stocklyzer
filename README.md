# Stocklyzer 📈

A comprehensive stock market analysis platform with both web and mobile applications, providing real-time market data, interactive charts, financial news, and investment insights.

## 🌟 Overview

Stocklyzer is a full-stack financial platform that helps users track stocks, analyze market trends, and stay informed with the latest financial news. The project consists of two main applications:

- **🌐 Web Application** - Built with Next.js 14 and TypeScript
- **📱 Mobile Application** - Built with React Native and Expo

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Finnhub API key (free at [finnhub.io](https://finnhub.io/))
- For mobile development: Expo CLI and iOS/Android development environment

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/abhishekboadgurjar/stocklyzer.git
cd stocklyzer
```

2. **Set up the Web Application:**
```bash
cd web
npm install
cp .env.local.example .env.local
# Add your Finnhub API key to .env.local
npm run dev
```

3. **Set up the Mobile Application:**
```bash
cd app
npm install
# Configure API key in config.js or app.json
npm start
```

## 📁 Project Structure

```
stocklyzer/
├── web/                    # Next.js Web Application
│   ├── app/               # Next.js app directory
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utilities and API integration
│   ├── public/           # Static assets
│   └── package.json      # Web dependencies
├── app/                   # React Native Mobile Application
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   ├── constants/        # API endpoints and constants
│   ├── assets/          # Images and static files
│   └── package.json     # Mobile dependencies
└── README.md            # This file
```

## 🛠 Tech Stack

### Web Application
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Charts**: Recharts
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

### Mobile Application
- **Framework**: React Native 0.79.4
- **Development Platform**: Expo SDK 53
- **Navigation**: React Navigation v7
- **Charts**: react-native-chart-kit
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons

### Shared
- **API**: Finnhub API for financial data
- **Version Control**: Git
- **Package Manager**: npm/yarn

## 🌟 Key Features

### 📊 Real-time Market Data
- Live stock prices and market indices
- Real-time price changes and percentages
- Market overview with key statistics
- Sector-wise performance analysis

### 📈 Interactive Charts
- Multiple time intervals (1D, 1W, 1M, 6M, 1Y, 5Y)
- Different chart types (Line, Area, Volume, Technical)
- Technical indicators and analysis tools
- Responsive chart layouts

### 📰 Financial News
- Latest market news and updates
- Category-based filtering
- News source attribution
- Real-time news feeds

### ⭐ Personal Watchlist
- Track favorite stocks
- Persistent storage across sessions
- Portfolio management tools
- Performance analytics

### 🔍 Market Insights
- Technical indicators (RSI, MACD, Moving Averages)
- Analyst recommendations and ratings
- Earnings calendar and estimates
- Investment insights and trends

### 🌙 User Experience
- Dark/Light mode support
- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation

## 🚀 Development

### Web Application

```bash
cd web
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linting
```

### Mobile Application

```bash
cd app
npm start            # Start Expo development server
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm run web          # Run on web browser (development)
```

## 📱 Platform Support

### Web Application
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: Responsive design for all mobile browsers
- **Tablet**: Optimized layouts for tablet devices

### Mobile Application
- **iOS**: 13.0 and later
- **Android**: API level 21 (Android 5.0) and later
- **Web**: Modern browsers (development only)

## 🔧 Configuration

### Environment Variables

#### Web Application (.env.local)
```env
NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key_here
```

#### Mobile Application (config.js or app.json)
```javascript
// config.js
export const FINNHUB_API_KEY = 'your_finnhub_api_key_here';

// or in app.json
{
  "expo": {
    "extra": {
      "finnhubApiKey": "your_api_key_here"
    }
  }
}
```

## 📊 API Integration

Both applications use the Finnhub API for:
- Real-time stock quotes
- Historical price data
- Company profiles and fundamentals
- Financial news and market updates
- Technical indicators and analyst ratings

## 🚀 Deployment

### Web Application

#### Vercel (Recommended)
```bash
cd web
npm run build
# Deploy to Vercel via GitHub integration
```

#### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Mobile Application

#### Expo Application Services (EAS)
```bash
cd app
npm install -g @eas/cli
eas login
eas build:configure
eas build --platform all
eas submit --platform ios
eas submit --platform android
```

## 🧪 Testing

### Web Application
```bash
cd web
npm test              # Run tests
npm run lint          # Run linting
npm run type-check    # TypeScript type checking
```

### Mobile Application
```bash
cd app
npm test              # Run tests (if configured)
npm run lint          # Run linting
```

## 📈 Performance Optimization

### Web Application
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: API response caching and static generation
- **Bundle Analysis**: Webpack bundle analyzer

### Mobile Application
- **Image Optimization**: Proper image sizing and caching
- **API Caching**: Implemented caching for API responses
- **Lazy Loading**: Components loaded on demand
- **Memory Management**: Proper cleanup of listeners and timers

## 🔒 Security

- API keys stored securely in environment variables
- Input validation and sanitization
- HTTPS for all API communications
- Secure storage for user data
- Regular dependency updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure cross-platform compatibility
- Test on multiple devices and browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

Stocklyzer is for informational purposes only. This is not financial advice. Always consult with a qualified financial advisor before making investment decisions.

## 🆘 Support

### Documentation
- [Web Application README](web/README.md)
- [Mobile Application README](app/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

### Community
- [GitHub Issues](https://github.com/your-username/stocklyzer/issues)
- [Next.js Discord](https://discord.gg/nextjs)
- [Expo Discord](https://chat.expo.dev/)
- [React Native Community](https://reactnative.dev/community)

### Contact
- **Email**: support@stocklyzer.com
- **Twitter**: [@stocklyzer](https://twitter.com/stocklyzer)
- **Website**: [stocklyzer.com](https://stocklyzer.com)

## 🔄 Updates

Stay updated with the latest features and bug fixes:

```bash
git pull origin main
cd web && npm install
cd ../app && npm install
```

## 📊 Roadmap

### Upcoming Features
- [ ] Real-time notifications and alerts
- [ ] Advanced portfolio analytics
- [ ] Social trading features
- [ ] AI-powered market predictions
- [ ] Cryptocurrency support
- [ ] International market data
- [ ] Advanced charting tools
- [ ] Paper trading simulation

### Version History
- **v1.0.0** - Initial release with basic features
- **v1.1.0** - Added advanced charts and technical indicators
- **v1.2.0** - Implemented watchlist and portfolio management
- **v1.3.0** - Added news integration and market insights

---

**Built with ❤️ using Next.js, React Native, and Expo**

*Stocklyzer - Your Gateway to Smart Investing* 

