import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MovieScreen from "../screens/MovieScreen";
import TabNavigation from "./TabNavigation";
import Search from "../screens/Search";
import Player from "../screens/Player";
import ViewAllScreen from "../screens/ViewAllScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigation"
          options={{ headerShown: false }}
          component={TabNavigation}
        />

        <Stack.Screen
          name="Movie"
          options={{ headerShown: false }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Player"
          options={{ orientation: "landscape", headerShown: false }}
          component={Player}
        />
        <Stack.Screen
          name="ViewAll"
          options={{ headerShown: false }}
          component={ViewAllScreen}
        />
        <Stack.Screen
          name="Search"
          options={{ headerShown: false }}
          component={Search}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
