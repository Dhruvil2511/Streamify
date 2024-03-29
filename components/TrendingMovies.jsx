import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const [currentItem, setCurrentItem] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    setCurrentItem(data[0]);
  }, []);

  function handleClick(item) {
    if (item.media_type === "tv") navigation.navigate("TvSeriesScreen", item);
    else navigation.navigate("MovieScreen", item);
  }
  function handleRenderItem({ item }) {
    return <MovieCard item={item} handleClick={handleClick} />;
  }

  return (
    <View className="mb-5 w-full">
      <Text className="text-white text-xl font-bold mx-5 mb-3">Trending</Text>
      <Carousel
        autoplay
        autoplayInterval={7000}
        data={data}
        renderItem={handleRenderItem}
        firstItem={8}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.65}
        slideStyle={{ display: "flex", alignItems: "center" }}
        onSnapToItem={(index) => setCurrentItem(data[index])}
      />

      <View
        style={{
          width: width,
          flex: 1,
          flexDirection: "row",
          justifyContent: "around",
          alignItems: "center",
        }}
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">Avg rating</Text>
          <Text className="text-neutral-400 text-sm">
            {currentItem?.vote_average}
          </Text>
        </View>
        <View className="flex-1 justify-center items-center">
          <LinearGradient
            colors={["rgba(229,64,107,1)", "rgba(19,108,170,1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="rounded-xl"
          >
            <Pressable
              className="p-3"
              style={{
                width: "100%",
              }}
              onPress={() => {
                if (currentItem?.media_type === "tv")
                  navigation.navigate("TvSeriesScreen", currentItem);
                else navigation.navigate("Player", currentItem?.id);
              }}
            >
              <Text className="text-white text-center text-lg">Watch Now</Text>
            </Pressable>
          </LinearGradient>
        </View>

        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-lg">Type</Text>
          <Text className="text-neutral-400 text-sm">
            {currentItem?.media_type.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TrendingMovies;
