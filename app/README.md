# Stocklyzer Mobile App

A comprehensive stock market analysis mobile application built with React Native and Expo, providing real-time market data, interactive charts, and financial news on the go.

## 📱 Features

- **Real-time Stock Data**: Live stock prices, market indices, and price changes
- **Interactive Charts**: Beautiful stock charts with multiple time intervals using react-native-chart-kit
- **Financial News**: Latest market news and updates
- **Stock Search**: Search and discover stocks with detailed information
- **Market Overview**: Comprehensive market statistics and trends
- **Cross-platform**: Works on both iOS and Android
- **Offline Support**: Basic offline functionality with cached data
- **Responsive Design**: Optimized for various screen sizes

## 🛠 Tech Stack

- **Framework**: React Native 0.79.4
- **Development Platform**: Expo SDK 53
- **Navigation**: React Navigation v7
- **Charts**: react-native-chart-kit
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons (Ionicons)
- **Animations**: React Native Reanimated
- **API**: Finnhub API for financial data

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Finnhub API key (free at https://finnhub.io/)

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/stocklyzer.git
cd stocklyzer/app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment configuration:
```bash
# Create a config.js file or use Expo's environment variables
```

4. Add your Finnhub API key to the configuration:
```javascript
// In config.js or app.json
{
  "expo": {
    "extra": {
      "finnhubApiKey": "your_api_key_here"
    }
  }
}
```

5. Start the development server:
```bash
npm start
# or
expo start
```

6. Run on your preferred platform:
```bash
# For iOS
npm run ios
# or
expo start --ios

# For Android
npm run android
# or
expo start --android

# For web (development)
npm run web
# or
expo start --web
```

## 📁 Project Structure

```
app/
├── App.js                 # Main application component
├── index.js              # Entry point
├── app.json              # Expo configuration
├── package.json          # Dependencies and scripts
├── config.js             # API configuration
├── constants/
│   └── api.js           # API endpoints and constants
├── screens/              # Screen components
│   ├── HomeScreen.js     # Main dashboard
│   ├── SearchScreen.js   # Stock search
│   ├── NewsScreen.js     # Financial news
│   ├── MarketOverviewScreen.js # Market statistics
│   ├── LoginScreen.js    # User authentication
│   └── SignupScreen.js   # User registration
├── components/           # Reusable components
│   ├── StockCardList.js  # Stock list component
│   ├── StockQuote.js     # Stock price display
│   ├── StockSearch.js    # Search functionality
│   ├── StockNews.js      # News display
│   └── CompanyProfile.js # Company information
└── assets/              # Images and static files
    ├── icon.png
    ├── splash-icon.png
    └── adaptive-icon.png
```

## 🎯 Key Features

### Home Screen
- Market overview with key indices
- Top gainers and losers
- Quick access to favorite stocks
- Market sentiment indicators

### Search Screen
- Real-time stock search
- Company information and statistics
- Add stocks to watchlist
- Historical price data

### News Screen
- Latest financial news
- Category filtering
- News source attribution
- Share functionality

### Market Overview Screen
- Market indices performance
- Sector-wise analysis
- Trading volume statistics
- Market trends and patterns

## 📊 API Integration

The app integrates with Finnhub API for:
- Real-time stock quotes
- Historical price data
- Company profiles and fundamentals
- Financial news
- Market indices

## 🎨 UI/UX Features

- **Modern Design**: Clean and intuitive interface
- **Smooth Animations**: React Native Reanimated for fluid transitions
- **Responsive Layout**: Adapts to different screen sizes
- **Dark/Light Mode**: Theme support (can be extended)
- **Gesture Support**: Touch gestures and interactions
- **Loading States**: Skeleton screens and loading indicators

## 📱 Platform Support

- **iOS**: 13.0 and later
- **Android**: API level 21 (Android 5.0) and later
- **Web**: Modern browsers (development only)

## 🔧 Development

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web browser
```

### Building for Production

```bash
# Install EAS CLI
npm install -g @eas/cli

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Publishing

```bash
# Publish to Expo
expo publish

# Or use EAS Update
eas update
```

## 🚀 Deployment

### Expo Application Services (EAS)

1. Install EAS CLI:
```bash
npm install -g @eas/cli
```

2. Login to your Expo account:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

4. Build for production:
```bash
eas build --platform all
```

5. Submit to app stores:
```bash
eas submit --platform ios
eas submit --platform android
```

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Run linting
npm run lint
```

## 📈 Performance Optimization

- **Image Optimization**: Proper image sizing and caching
- **API Caching**: Implemented caching for API responses
- **Lazy Loading**: Components loaded on demand
- **Memory Management**: Proper cleanup of listeners and timers

## 🔒 Security

- API keys stored securely
- Input validation and sanitization
- Secure storage for user data
- HTTPS for all API communications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

Stocklyzer is for informational purposes only. This is not financial advice. Always consult with a qualified financial advisor before making investment decisions.

## 🆘 Support

- **Documentation**: Check the [Expo documentation](https://docs.expo.dev/)
- **Issues**: Create an issue on GitHub
- **Community**: Join the [Expo Discord](https://chat.expo.dev/)

## 🔄 Updates

Stay updated with the latest features and bug fixes by regularly pulling from the main branch:

```bash
git pull origin main
npm install
```

---

**Built with ❤️ using React Native and Expo** 