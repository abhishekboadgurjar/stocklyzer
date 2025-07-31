import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const indices = [
  { name: "S&P 500", symbol: "^GSPC", value: "5,543.09", change: "+0.72%" },
  { name: "NASDAQ", symbol: "^IXIC", value: "18,252.63", change: "+1.03%" },
  { name: "Dow Jones", symbol: "^DJI", value: "39,282.54", change: "-0.21%" },
  { name: "NIFTY 50", symbol: "^NSEI", value: "23,580.00", change: "+0.45%" },
];

const MarketOverviewScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Market Overview</Text>

      {indices.map((index, i) => {
        const isPositive = index.change.startsWith("+");
        return (
          <View
            key={i}
            style={[
              styles.card,
              { borderLeftColor: isPositive ? "#28C76F" : "#EA5455" },
            ]}
          >
            <View style={styles.row}>
              <View>
                <Text style={styles.name}>{index.name}</Text>
                <Text style={styles.symbol}>{index.symbol}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.value}>{index.value}</Text>
                <View style={styles.changeRow}>
                  <Ionicons
                    name={isPositive ? "arrow-up" : "arrow-down"}
                    size={16}
                    color={isPositive ? "#28C76F" : "#EA5455"}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={[
                      styles.change,
                      { color: isPositive ? "#28C76F" : "#EA5455" },
                    ]}
                  >
                    {index.change}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}

      <Image
        source={{
          uri: "https://cdn.dribbble.com/users/1932411/screenshots/15671539/media/54840cc7082b4a246d17305a3d7c1ae7.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
    color: "#007AFF",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  symbol: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 2,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "right",
    color: "#111827",
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  change: {
    fontSize: 16,
    fontWeight: "600",
  },
  right: {
    alignItems: "flex-end",
  },
  image: {
    width: "100%",
    height: 220,
    marginTop: 30,
    borderRadius: 16,
  },
});

export default MarketOverviewScreen;
