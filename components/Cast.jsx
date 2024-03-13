import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import { fallbackposter, image185 } from "../api/movieDb";

const Cast = React.memo(({ cast }) => {
  return (
    <View className="my-5 mx-3">
      <Text className="text-white text-lg my-5">Top Cast</Text>
      <FlatList
        data={cast}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity key={index} className="mr-4 items-center ">
              <Image
                className=" rounded-full h-20 w-20 "
                source={{
                  uri: item?.profile_path
                    ? image185(item.profile_path)
                    : fallbackposter,
                }}
              />
              <Text className="text-white text-xs mt-1">
                {item?.original_name?.length > 15
                  ? item?.original_name.slice(0, 15) + "..."
                  : item?.original_name}
              </Text>
              <Text className="text-neutral-600 text-sm">as</Text>
              <Text className="text-white text-xs mt-1">
                {item?.character?.length > 15
                  ? item.character?.slice(0, 15) + "..."
                  : item?.character}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
});

export default Cast;
