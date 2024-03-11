import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import MoviesTab from "../screens/MoviesTab";
import TvSeriesTab from "../screens/TvSeriesTab";
import LikedTab from "../screens/LikedTab";
import TopBar from "../components/TopBar";

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <>
      <TopBar />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Movies") {
              iconName = focused ? "play-circle" : "play-circle-outline";
            } else if (route.name === "TvSeries")
              iconName = focused ? "tv" : "tv-outline";
            else if (route.name === "Liked")
              iconName = focused ? "heart" : "heart-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: "black",
          },
          tabBarActiveTintColor: "#e5406b",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Tab.Screen
          name="Movies"
          options={{ headerShown: false }}
          component={MoviesTab}
        />
        <Tab.Screen
          name="TvSeries"
          options={{ headerShown: false }}
          component={TvSeriesTab}
        />
        <Tab.Screen
          name="Liked"
          options={{ headerShown: false }}
          component={LikedTab}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;
