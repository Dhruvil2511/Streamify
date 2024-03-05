import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");

const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";
const Player = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const { params: id } = useRoute();
  useEffect(() => {
    console.log(id);
    if (id) setIsLoading(false);
  }, [id]);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <>
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 w-full flex-row justify-between px-5 ${topMargin}`}
        >
          <TouchableOpacity
            className="rounded-xl p-1 bg-blue-600"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <WebView
        className="bg-neutral-800"
        allowsFullscreenVideo={true}
        bounces={false}
        source={{
          html: `
        <!DOCTYPE html>
        <html>
        <head></head> 
        <body>
        <iframe src="https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1"
        title="Player" allowfullscreen width="100%" height=${height + 50}>
        </iframe>
        </body>
        </html>
        `,
        }}
      />
    </>
  );
};

export default Player;
