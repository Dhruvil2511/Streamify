import { View, Text, Platform, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import React from "react";
import {
  InformationCircleIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS === "ios";

const TopBar = () => {
  const navigation = useNavigation();
  return (
    <View className={ios ? "-mb-2 bg-neutral-950 " : "bg-neutral-950"}>
      <StatusBar style="light" />
      <View className="flex-row justify-between h-10 items-center w-100 mx-2 mt-5">
        <View className="flex-row justify-start items-center">
          <View>
            <Image
              source={require("../assets/logo_2.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View>
            <Text className="text-white text-2xl font-bold">Streamify</Text>
          </View>
        </View>
        <View className="flex-row justify-start items-center">
          <View className="px-5">
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size={35} strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Information")}>
              <InformationCircleIcon size={35} strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopBar;
