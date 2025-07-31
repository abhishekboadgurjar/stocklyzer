import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Screens
import HomeScreen from "./screens/HomeScreen";
import NewsScreen from "./screens/NewsScreen";
import SearchScreen from "./screens/SearchScreen";
import MarketOverviewScreen from "./screens/MarketOverviewScreen";

const Tab = createBottomTabNavigator();

const CustomHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>📈 Stocklyzer</Text>
  </View>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerTitle: () => <CustomHeader />,
      headerTitleAlign: "center",
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === "Home") iconName = "home";
        else if (route.name === "News") iconName = "newspaper";
        else if (route.name === "Search") iconName = "search";
        else if (route.name === "Market") iconName = "stats-chart";

        return <Ionicons name={iconName} size={24} color={color} />;
      },
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
        height: 70,
        paddingBottom: 12,
        paddingTop: 8,
        backgroundColor: "#ffffff",
        borderTopWidth: 0,
        elevation: 0,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 4,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="News" component={NewsScreen} />
    <Tab.Screen name="Market" component={MarketOverviewScreen} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
          <NavigationContainer>
            <MainTabs />
          </NavigationContainer>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
