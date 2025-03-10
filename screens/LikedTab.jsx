import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeartIcon } from "react-native-heroicons/solid";
import { Image } from "react-native-elements";
import { image185 } from "../api/movieDb";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { showAlert } from "../utils/Alert";

const { width, height } = Dimensions.get("window");
const LikedTab = () => {
  const [currentActive, setCurrentActive] = useState("movies");
  const [likedList, setLikedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigation = useNavigation();

  const fetchData = async () => {
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      const data = await AsyncStorage.getItem("users-favourite");
      let parsedData = JSON.parse(data) || [];
      let changedData = [];
      if (parsedData.length > 0) {
        changedData =
          currentActive === "movies"
            ? parsedData.filter((item) => item.media_type === "movie")
            : parsedData.filter((item) => item.media_type === "tv");
      }
      setLikedList(changedData);
    } catch (error) {
      showAlert();
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentActive]);

  return (
    <View className="bg-neutral-950 flex-1">
      {isLoading && (
        <Progress.Bar
          indeterminate
          indeterminateAnimationDuration={500}
          width={null}
          borderRadius={0}
          height={2}
          borderWidth={0}
          color="rgba(229,64,107,1)"
        />
      )}

      <View className="my-4 flex-row justify-around w-full items-center">
        <TouchableOpacity
        className="rounded-xl"
          onPress={() => {
            setCurrentActive("movies");
          }}
          style={{
            backgroundColor:
              currentActive === "movies"
                ? "rgba(229,64,107,0.9)"
                : "transparent",
            borderRadius: 5,
          }}
        >
          <Text className="text-white px-3 py-1 ">Movies </Text>
        </TouchableOpacity>
        <TouchableOpacity
        className="rounded-xl"
          onPress={() => {
            setCurrentActive("series");
          }}
          style={{
            backgroundColor:
              currentActive === "series"
                ? "rgba(229,64,107,0.9)"
                : "transparent",
            borderRadius: 5,
          }}
        >
          <Text className="text-white px-3 py-1 ">Tv Series</Text>
        </TouchableOpacity>
      </View>
      {likedList?.length > 0 ? (
        <>
          <Text className="text-white font-semibold m-1 mx-5">
            Favourite {currentActive === "movies" ? "Movies" : "Series"}•{" "}
            {likedList?.length}
          </Text>
          <FlatList
            data={likedList}
            className="space-y-2"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  className="flex-row flex-wrap justify-between mx-4"
                >
                  <View className="w-full flex-row my-2 justify-start items-center">
                    <TouchableOpacity
                      onPress={() => {
                        item?.media_type === "movie"
                          ? navigation.navigate("MovieScreen", item)
                          : navigation.navigate("TvSeriesScreen", item);
                      }}
                    >
                      <Image
                        source={{
                          uri: image185(item?.poster_path) || fallbackposter,
                        }}
                        className="rounded-xl"
                        style={{
                          width: width * 0.29,
                          height: height * 0.18,
                        }}
                      />
                    </TouchableOpacity>
                    <View className="ml-5 py-2 w-full my-2 flex-col justify-start items-start">
                      <View className="flex-row w-60">
                        <Text
                          className="text-white w-72 font-semibold  text-xl flex-1 flex-wrap"
                          numberOfLines={2}
                        >
                          {item.media_type === "tv"
                            ? item?.name?.length > 30
                              ? item?.name.slice(0, 30) + "..."
                              : item?.name
                            : item?.title?.length > 30
                            ? item?.title.slice(0, 30) + "..."
                            : item?.title}
                          {}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-neutral-500 font-bold text-md">
                          Rating : {item?.vote_average}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => fetchData()}
                colors={["rgba(229,64,107,1)"]} // Set colors for the refresh indicator
                tintColor={"rgba(229,64,107,1)"} // Set tint color for the refresh indicator
              />
            }
          />
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <HeartIcon size={50} color="red" />
          <Text className="text-white">Your liked movies will appear here</Text>
        </View>
      )}
    </View>
  );
};

export default LikedTab;
