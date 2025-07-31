import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const StockSearch = ({ onSelectSymbol }) => {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = () => {
    const trimmed = symbol.trim().toUpperCase();
    if (trimmed) {
      onSelectSymbol(trimmed);
      setSymbol(""); // Clear input for better UX
    } else {
      Alert.alert("Please enter a valid stock symbol");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="🔍 Enter Stock Symbol (e.g. AAPL)"
        onChangeText={setSymbol}
        value={symbol}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
      <Button title="Search" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
});

export default StockSearch;
