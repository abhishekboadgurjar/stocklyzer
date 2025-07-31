import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import StockSearch from "../components/StockSearch";
import CompanyProfile from "../components/CompanyProfile";
import StockQuote from "../components/StockQuote";
import StockNews from "../components/StockNews";

const SearchScreen = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (symbol) => {
    try {
      setLoading(true);
      setProfile(null);

      const res = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=YOUR_API_KEY`
      );
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (symbol) => {
    setSelectedSymbol(symbol);
    fetchProfile(symbol);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🔍 Search for a Stock</Text>

      <View style={styles.searchBox}>
        <StockSearch onSelectSymbol={handleSelect} />
      </View>

      {loading && <ActivityIndicator size="large" color="#007AFF" />}

      {profile && (
        <View style={styles.profileCard}>
          {profile.logo ? (
            <Image source={{ uri: profile.logo }} style={styles.logo} />
          ) : (
            <Text style={styles.placeholderLogo}>📊</Text>
          )}
          <View>
            <Text style={styles.symbol}>{profile.ticker}</Text>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.exchange}>{profile.exchange}</Text>
          </View>
        </View>
      )}

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
    padding: 14,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 14,
    borderRadius: 8,
  },
  placeholderLogo: {
    fontSize: 40,
    marginRight: 14,
  },
  symbol: {
    fontSize: 18,
    fontWeight: "bold",
  },
  name: {
    color: "#555",
  },
  exchange: {
    color: "#888",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
});

export default SearchScreen;
