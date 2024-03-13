import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fallbackposter, image185 } from "../api/movieDb";
const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  return (
    <View className="my-2 mx-3">
      <View className="flex-row justify-between items-center ">
        <Text className="text-white text-xl">{title}</Text>
        <TouchableOpacity
          className="text-white"
          onPress={() => {
            if (title === "Upcoming Movies")
              navigation.navigate("Upcoming", title);
            else if (title === "Top Rated Series")
              navigation.navigate("TvSeries", title);
            else navigation.navigate("Movies", title);
          }}
        >
          {!hideSeeAll ? (
            <Text className="text-md" style={{ color: "rgba(229,64,107,0.9)" }}>
              See all
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
      <View className="my-2 flex-row justify-center items-center ">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                className="pr-4"
                key={index}
                onPress={() =>
                  title.includes("Movies")
                    ? navigation.navigate("MovieScreen", item)
                    : navigation.navigate("TvSeriesScreen", item)
                }
              >
                <Image
                  source={{
                    uri: item?.poster_path
                      ? image185(item.poster_path)
                      : fallbackposter,
                  }}
                  className="rounded-xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-white my-2 text-center">
                  {title.includes("Movies")
                    ? item?.title?.length > 14
                      ? item.title.slice(0, 14) + "..."
                      : item?.title
                    : item?.original_name?.length > 14
                    ? item.original_name.slice(0, 14) + "..."
                    : item?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default MovieList;
