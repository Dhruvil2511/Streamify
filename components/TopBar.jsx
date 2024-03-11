import React from "react";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ios = Platform.OS === "ios";

const TopBar = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "black",
        paddingBottom: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/logo_2.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Streamify
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={{ paddingHorizontal: 5 }}
        >
          <MagnifyingGlassIcon size={35} strokeWidth={2} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Information")}
          style={{ paddingHorizontal: 5 }}
        >
          <InformationCircleIcon size={35} strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TopBar;
