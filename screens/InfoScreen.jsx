import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const InfoScreen = () => {
    const navigation=useNavigation();
  return (
    <SafeAreaView className="bg-neutral-950 flex-1">
      <View className="flex-row justify-center items-center">
        <Text className="text-white text-xl font-bold">
          Information about project
        </Text>
      </View>
      <View
        className={`absolute z-50 w-full flex-row justify-between px-5 py-5 `}
      >
        <TouchableOpacity
          className="rounded-xl p-1 bg-blue-600"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center items-start w-full">
        <View className="my-2">
          <Text className="text-white text-xl mx-2">
            This app was created for learning and project purpose.
          </Text>
        </View>
        <View className="my-2">
          <Text className="text-lg text-neutral-500 mx-2">
            We do not store any files on our servers, all the videos are hosted
            on 3rd party services.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;
