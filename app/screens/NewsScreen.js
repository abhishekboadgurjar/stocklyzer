import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, Linking, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from '../constants/api';

const NewsScreen = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeneralNews = async () => {
      try {
        const res = await axios.get(`${FINNHUB_BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`);
        setNews(res.data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGeneralNews();
  }, []);

  const openLink = (url) => {
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0A84FF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🗞️ Market News</Text>
      {news.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => openLink(item.url)} activeOpacity={0.8}>
          <View style={styles.card}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>No Image</Text>
              </View>
            )}
            <View style={styles.content}>
              <Text style={styles.title}>{item.headline}</Text>
              <Text style={styles.source}>{item.source}</Text>
              <Text style={styles.date}>{new Date(item.datetime * 1000).toLocaleString()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F9FAFB',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E293B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 180,
  },
  placeholderImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#64748B',
    fontStyle: 'italic',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  source: {
    color: '#6B7280',
    fontSize: 14,
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#9CA3AF',
  },
});

export default NewsScreen;
