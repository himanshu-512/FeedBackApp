import React from "react";
import { Tabs } from "expo-router";
import CustomNavBar from "../../components/customTabbar";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift", // 👈 smooth horizontal slide
        animationDuration: 250, // 🔥 usually required with custom tab bar
      }}
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="setting" options={{ title: "Analytics" }} />
      <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
