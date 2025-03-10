import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MovieScreen from "../screens/MovieScreen";
import TabNavigation from "./TabNavigation";
import Search from "../screens/Search";
import Player from "../screens/Player";
import UpcomingScreen from "../screens/UpcomingScreen";
import TvSeriesScreen from "../screens/TvSeriesScreen";
import InfoScreen from "../screens/InfoScreen";
import { ServerProvider } from "../context/ServerContext";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <ServerProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigation"
            options={{ orientation: "portrait", headerShown: false }}
            component={TabNavigation}
          />

          <Stack.Screen
            name="MovieScreen"
            options={{ orientation: "portrait", headerShown: false }}
            component={MovieScreen}
          />
          <Stack.Screen
            name="TvSeriesScreen"
            options={{ orientation: "portrait", headerShown: false }}
            component={TvSeriesScreen}
          />
          <Stack.Screen
            name="Player"
            options={{ orientation: "default", headerShown: false }}
            component={Player}
          />
          <Stack.Screen
            name="Upcoming"
            options={{ orientation: "portrait", headerShown: false }}
            component={UpcomingScreen}
          />
          <Stack.Screen
            name="Search"
            options={{ orientation: "portrait", headerShown: false }}
            component={Search}
          />
          <Stack.Screen
            name="Information"
            options={{ orientation: "portrait", headerShown: false }}
            component={InfoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ServerProvider>

  );
};

export default AppNavigation;
