import React, { memo } from "react";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackposter, image185 } from "../api/movieDb";

const { width, height } = Dimensions.get("window");

const MovieItem = memo(({ item, title }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (title?.includes("Movies")) navigation.navigate("MovieScreen", item);
    else navigation.navigate("TvSeriesScreen", item);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center justify-start mx-2 my-2"
    >
      <Image
        source={{ uri: image185(item?.poster_path) || fallbackposter }}
        className="rounded-xl"
        style={{ width: width * 0.29, height: height * 0.22 }}
      />
    </TouchableOpacity>
  );
});

export default MovieItem;
