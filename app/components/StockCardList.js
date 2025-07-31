// components/StockCardList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '../constants/api';

const StockCardList = ({ title, symbols = [], onSelect }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStockData = async () => {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const [quote, profile] = await Promise.all([
            axios.get(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
            axios.get(`${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
          ]);
          return {
            symbol,
            name: profile.data.name || symbol,
            price: quote.data.c,
            change: quote.data.dp
          };
        } catch (e) {
          return null;
        }
      })
    );

    setData(results.filter(Boolean));
    setLoading(false);
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) return <ActivityIndicator style={{ margin: 10 }} />;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item.symbol)} style={styles.card}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={[styles.change, { color: item.change >= 0 ? 'green' : 'red' }]}>
              {item.change >= 0 ? '▲' : '▼'} {item.change.toFixed(2)}%
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginRight: 12,
    width: 120,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: 16
  },
  name: {
    fontSize: 12,
    color: 'gray'
  },
  price: {
    fontSize: 14,
    marginTop: 4
  },
  change: {
    fontSize: 12,
    marginTop: 2
  }
});

export default StockCardList;
