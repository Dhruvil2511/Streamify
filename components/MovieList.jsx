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
    <View className="my-5 mx-5">
      <View className="flex-row justify-between items-center ">
        <Text className="text-white text-xl">{title}</Text>
        <TouchableOpacity className="text-white">
          {!hideSeeAll ? (
            <Text className="text-white text-md">See all</Text>
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
                onPress={() => navigation.push("Movie", item)}
              >
                <Image
                  source={{
                    uri: item?.poster_path
                      ? image185(item.poster_path)
                      :fallbackposter,
                  }}
                  className="rounded-xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-white my-2 text-center">
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
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
