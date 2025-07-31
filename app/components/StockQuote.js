import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '../constants/api';

const StockQuote = ({ symbol }) => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await axios.get(`${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`);
      setQuote(res.data);
    };
    fetchQuote();
  }, [symbol]);

  if (!quote) return null;

  return (
    <View>
      <Text>📉 Current Price: ${quote.c}</Text>
      <Text>High: ${quote.h}</Text>
      <Text>Low: ${quote.l}</Text>
      <Text>Open: ${quote.o}</Text>
    </View>
  );
};

export default StockQuote;
