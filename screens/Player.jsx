import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  AppState,
  Dimensions,
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const Player = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieOrNot, setMovieOrNot] = useState(true);

  const {
    params: { id, episode, season },
  } = useRoute();

  const [embedString, setEmbedString] = useState(
    `https://www.2embed.cc/embed/${id}`
  );

  useEffect(() => {
    if (id) {
      setMovieOrNot(true);
      setEmbedString(`https://www.2embed.cc/embed/${id}`);
    }
    if (id && episode && season) {
      setMovieOrNot(false);
      setEmbedString(
        `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
      );
    }
    setIsLoading(false);
  }, [id]);

  return isLoading ? (
    <SafeAreaView className="flex-1 justify-center items-center  bg-neutral-950">
      <ActivityIndicator className="bg-neutral-950" size={30} />
    </SafeAreaView>
  ) : (
    <SafeAreaView className="flex-1  bg-neutral-950">
      <WebView
        className="bg-neutral-950"
        source={
          movieOrNot
            ? {
                html: `<iframe src="${embedString}" sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" style="width: 100%; height: 100%;" frameborder="0"  allowfullscreen></iframe>`,
              }
            : {
                html: `<iframe src="${embedString}"  style="width: 100%; height: 100%;" frameborder="0"  allowfullscreen></iframe>`,
              }
        }
        limitsNavigationsToAppBoundDomains={true}
        allowsFullscreenVideo={true}
        textInteractionEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        startInLoadingState
      />
    </SafeAreaView>
  );
};

export default Player;
