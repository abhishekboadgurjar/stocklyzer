import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from "../constants/api";

const StockNews = ({ symbol }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const today = new Date();
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);

      const from = lastWeek.toISOString().split("T")[0];
      const to = today.toISOString().split("T")[0];

      const res = await axios.get(
        `${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
      );
      setNews(res.data.slice(0, 5)); // Limit to 5 articles
    };
    fetchNews();
  }, [symbol]);

  if (!news.length) return null;

  return (
    <View>
      <Text style={{ fontWeight: "bold", marginTop: 10 }}>📰 Latest News</Text>
      {news.map((item, index) => (
        <View key={index}>
          <Text style={{ fontWeight: "600" }}>{item.headline}</Text>
          <Text>{item.source}</Text>
        </View>
      ))}
    </View>
  );
};

export default StockNews;
