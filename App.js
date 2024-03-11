import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import AppNavigation from "./navigation/AppNavigation";

export default function App() {
  return (
    <>
      <StatusBar
        hidden={true}
        animated
        backgroundColor="black"
        barStyle="dark-content"
      />

      <AppNavigation />
    </>
  );
}
