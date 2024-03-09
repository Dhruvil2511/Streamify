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

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
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
          options={{ orientation: "all", headerShown: false }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
