import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import {
  ChevronLeftIcon,
  FilmIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import {
  fallbackposter,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  image185,
} from "../api/movieDb";

const { width, height } = Dimensions.get("window");

const UpcomingScreen = () => {
  const navigation = useNavigation();
  const [upcomingMoviesResult, setUpcomingMoviesResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  async function getUpcomingMovies() {
    const data = await fetchUpcomingMovies({ page: currentPage });
    if (data && data.results) {
      setUpcomingMoviesResult((prevResults) => [
        ...prevResults,
        ...data.results,
      ]);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    getUpcomingMovies();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [currentPage]);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <View className="flex-row justify-center w-full items-center">
        <View className="my-3 w-96  flex-row justify-between items-center rounded-xl">
          <TouchableOpacity
            className="rounded-xl p-1 m-1 bg-blue-500"
            onPress={() => navigation.navigate("Home")}
          >
            <ChevronLeftIcon
              size="25"
              color={"white"}
              className="bg-blue-500"
            />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-semibold">
            Upcoming Movies
          </Text>

          <TouchableOpacity
            className="rounded-xl p-3 m-1"
            onPress={() => navigation.push("Search")}
          >
            <MagnifyingGlassIcon size="25" color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <View className="w-full">
          <Progress.Bar
            indeterminate={true}
            indeterminateAnimationDuration={500}
            width={null}
            borderRadius={0}
            height={2}
            borderWidth={0}
            color="rgba(229,64,107,1)"
          />
        </View>
      ) : null}
      {upcomingMoviesResult.length > 0 ? (
        <ScrollView
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          className="space-y-2"
        >
          <View className="flex-row flex-wrap justify-between  mx-5 my-5">
            {upcomingMoviesResult.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                  className="my-3"
                >
                  <Image
                    source={{
                      uri: image185(item?.poster_path) || fallbackposter,
                    }}
                    className="rounded-xl"
                    style={{ width: width * 0.29, height: height * 0.22 }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <FilmIcon size="50" color="white" />
          <Text className="text-white">Your Search will appear here</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UpcomingScreen;
