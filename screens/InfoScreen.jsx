import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const InfoScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="pt-6 bg-neutral-950 flex-1">
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
          <Text className="text-center text-white text-xl mx-2">
            This app was created for learning and project purpose.
          </Text>
        </View>
        <View className="my-2">
          <Text className=" text-center text-lg text-neutral-500 mx-2">
            We do not store any files on our server. We only provide links to
            media that is hosted on third-party services. If you have any legal
            concerns about the free online movies on this site, you should
            contact the actual file hosts themselves, as we are not affiliated
            with them. We do not host or upload any videos, movies, or media
            files. Streamify is not responsible for the accuracy,
            compliance, copyright, legality, decency, or any other aspect of the
            content on linked sites. If you have any legal issues, please
            contact the appropriate media file owners or host sites.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;
