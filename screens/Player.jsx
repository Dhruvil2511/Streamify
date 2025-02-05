import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Dimensions,
  Text,
  Linking,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { fallbackposter } from "../api/movieDb";

const Player = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    params: { id, episode, season, server },
  } = useRoute();

  const [embedString, setEmbedString] = useState(server.url);

  function showToast() {
    ToastAndroid.show("Turn on auto-rotate for fullscreen", ToastAndroid.SHORT);
  }

  useEffect(() => {
    if (id) {
      switch (server.id) {
        case 1:
          setEmbedString(`${server.url}movie/?id=${id}`);
          break;
        case 2:
          setEmbedString(`${server.url}video_id=${id}&tmdb=1`);
          break;
        case 3:
          setEmbedString(`${server.url}movie/${id}`);
          break;
        default:
          setEmbedString(`${server.url}video_id=${id}&tmdb=1`);
          break;
      }
    }
    if (id && episode && season) {
      switch (server.id) {
        case 1:
          setEmbedString(`${server.url}tv/?id=${id}/${season}/${episode}`);
          break;
        case 2:
          setEmbedString(`${server.url}video_id=${id}&tmdb=1&s=${season}&e=${episode}`);
          break;
        case 3:
          setEmbedString(`${server.url}tv?tmdb=${id}&season=${season}&episode=${episode}`);
          break;
        default:
          setEmbedString(`${server.url}video_id=${id}&tmdb=1&s=${season}&e=${episode}`);
          break;

      }
    }
    setIsLoading(false);
  }, [id]);

  const serveEvent = (event) => {
    const url = event.url;
    console.log(url);
    if (url !== embedString || url.includes("ads")) {
      return false;
    }
    return true;
  }

  return isLoading ? (
    <SafeAreaView className="flex-1 justify-center items-center  bg-neutral-950">
      <ActivityIndicator className="bg-neutral-950" size={30} />
    </SafeAreaView>
  ) : (
    <SafeAreaView className="flex-1  bg-neutral-950">
      <View>
        <Text className="text-white font-bold text-xs text-center">
          ⚠️ Switch servers if content isn't playable.
        </Text>
      </View>
      <WebView
        className="bg-neutral-950 text-white"
        source={{ html: `<iframe src="${embedString}" style="width:100%; height:100%;" frameborder="0" scrolling="no" allowfullscreen></iframe>` }}
        limitsNavigationsToAppBoundDomains={true}
        onShouldStartLoadWithRequest={(request) => {
          if (request.url.startsWith('https://flicky.host/embed/') || request.url.startsWith('https://multiembed.mov/directstream.php?') || request.url.startsWith('https://vidsrc.xyz/embed/')) {
            return true;
          }
          return false;
        }}
        setSupportMultipleWindows={false} 
        allowsFullscreenVideo={true}
        textInteractionEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        startInLoadingState
        scalesPageToFit={false}
        onLoadEnd={showToast}
      />
    </SafeAreaView>
  );
};

export default Player;
