import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Button,
} from "react-native";
import React from "react";
import { fallbackposter, original } from "../api/movieDb";
const { width, height } = Dimensions.get("window");

const MovieCard = ({ item, handleClick }) => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={{ uri: original(item.poster_path) || fallbackposter }}
          style={{ width: width * 0.6, height: height * 0.4 }}
          className="rounded-xl"
        />
      </TouchableWithoutFeedback>
      <View className="mt-5">
        <Text className="text-center text-white font-bold text-2xl">
          {item.media_type === "tv"
            ? item.name?.length > 30
              ? item.name?.slice(0, 30) + "..."
              : item.name
            : item.title?.length > 30
            ? item.title?.slice(0, 30) + "..."
            : item.title}
        </Text>
        <Text className="my-2 text-center text-neutral-500 font-semibold text-md">
          {item?.media_type?.toUpperCase()} • {item.media_type==="tv"?item?.first_air_date:item?.release_date}
        </Text>
      </View>
    </View>
  );
};

export default MovieCard;
