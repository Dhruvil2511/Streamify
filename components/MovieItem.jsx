import React, { memo } from "react";
import { TouchableOpacity, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackposter, image185 } from "../api/movieDb";

const { width, height } = Dimensions.get("window");

const MovieItem = memo(({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (item?.media_type === "tv") navigation.navigate("TvSeriesScreen", item);
    else navigation.navigate("MovieScreen", item);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center justify-start mx-2 my-2"
    >
      <Image
        source={{ uri: image185(item?.poster_path) || fallbackposter }}
        style={{ width: width * 0.29, height: height * 0.22 }}
      />
    </TouchableOpacity>
  );
});

export default MovieItem;
