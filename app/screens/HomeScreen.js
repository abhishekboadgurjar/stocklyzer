import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import StockCardList from "../components/StockCardList";
import CompanyProfile from "../components/CompanyProfile";
import StockQuote from "../components/StockQuote";
import StockNews from "../components/StockNews";

const popularStocks = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA"];
const topGainers = ["NVDA", "AMD", "META", "NFLX", "BA"];
const topLosers = ["PYPL", "INTC", "T", "DIS", "BABA"];
const etfs = ["SPY", "QQQ", "DIA", "VTI", "IWM"];

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  // ✅ When coming back from SearchScreen with a selected stock
  useEffect(() => {
    if (route.params?.selectedSymbol) {
      setSelectedSymbol(route.params.selectedSymbol);
    }
  }, [route.params?.selectedSymbol]);

  return (
    <ScrollView style={styles.container}>
      {/* 🔍 Search Card */}
      <TouchableOpacity
        style={styles.searchCard}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.searchText}>🔍 Tap to Search Stocks</Text>
      </TouchableOpacity>

      {/* 🔥 Popular Stocks */}
      <StockCardList
        title="🔥 Popular Stocks"
        symbols={popularStocks}
        onSelect={setSelectedSymbol}
      />

      {/* 📈 Top Gainers */}
      <StockCardList
        title="📈 Top Gainers"
        symbols={topGainers}
        onSelect={setSelectedSymbol}
      />

      {/* 📉 Top Losers */}
      <StockCardList
        title="📉 Top Losers"
        symbols={topLosers}
        onSelect={setSelectedSymbol}
      />

      {/* 💼 ETFs */}
      <StockCardList
        title="💼 ETFs"
        symbols={etfs}
        onSelect={setSelectedSymbol}
      />

      {/* 🧾 Details when a stock is selected */}
      {selectedSymbol && (
        <>
          <View style={styles.card}>
            <CompanyProfile symbol={selectedSymbol} />
          </View>
          <View style={styles.card}>
            <StockQuote symbol={selectedSymbol} />
          </View>
          <View style={styles.card}>
            <StockNews symbol={selectedSymbol} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f4f4f4",
  },
  searchCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    alignItems: "center",
  },
  searchText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
});

export default HomeScreen;
