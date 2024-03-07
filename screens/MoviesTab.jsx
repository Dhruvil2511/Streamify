import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { FilmIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import {
  fallbackposter,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  image185,
} from "../api/movieDb";
const { width, height } = Dimensions.get("window");
import * as Progress from "react-native-progress";

const MoviesTab = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);
  const { params: title } = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [currentActive, setCurrentActive] = useState("Popular Movies");
  const getPopularMovies = async (page) => {
    setIsLoading(true);
    if (page === 1) setResults([]);
    const data = await fetchPopularMovies({ page: page });
    if (data && data.results) {
      setResults((prevResults) => {
        const existingIds = new Set(prevResults.map((item) => item.id));
        const filteredResults = data.results.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prevResults, ...filteredResults];
      });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getTopRatedMovies = async (page) => {
    setIsLoading(true);
    if (page === 1) setResults([]);
    const data = await fetchTopRatedMovies({ page: page });
    if (data && data.results) {
      setResults((prevResults) => {
        const existingIds = new Set(prevResults.map((item) => item.id));
        const filteredResults = data.results.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prevResults, ...filteredResults];
      });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getLatestMovies = async (page) => {
    setIsLoading(true);
    const data = await fetchNowPlayingMovies({ page: page });

    if (page === 1) setResults([]);
    if (data && data.results) {
      setResults((prevResults) => {
        const existingIds = new Set(prevResults.map((item) => item.id));
        const filteredResults = data.results.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prevResults, ...filteredResults];
      });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (title) setCurrentActive(title);
  }, [title]);

  useEffect(() => {
    if (currentActive === "Popular Movies") getPopularMovies(currentPage);
    else if (currentActive === "Top Rated Movies")
      getTopRatedMovies(currentPage);
    else if (currentActive === "Now Playing Movies")
      getLatestMovies(currentPage);
  }, [currentPage, currentActive]);

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
    <SafeAreaView className="bg-neutral-950 flex-1">
      <TopBar />
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
      <View className="my-4 flex-row justify-around w-full items-center">
        <TouchableOpacity
          className="rounded-xl"
          onPress={() => {
            setCurrentActive("Popular Movies");
            getPopularMovies(1);
          }}
          style={
            currentActive === "Popular Movies"
              ? { backgroundColor: "rgba(229,64,107,0.9)" }
              : { backgroundColor: "transparent" }
          }
        >
          <Text className="text-white px-3 opacity-100 ">Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-xl"
          onPress={() => {
            setCurrentActive("Top Rated Movies");
            getTopRatedMovies(1);
          }}
          style={
            currentActive === "Top Rated Movies"
              ? { backgroundColor: "rgba(229,64,107,0.9)" }
              : { backgroundColor: "transparent" }
          }
        >
          <Text className="text-white px-3">Top Rated</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-xl"
          onPress={() => {
            setCurrentActive("Now Playing Movies");
            getLatestMovies(1);
          }}
          style={
            currentActive === "Now Playing Movies"
              ? { backgroundColor: "rgba(229,64,107,0.9)" }
              : { backgroundColor: "transparent" }
          }
        >
          <Text className="text-white px-3">Latest</Text>
        </TouchableOpacity>
      </View>
      {results.length > 0 ? (
        <FlatList
          data={results}
          onScroll={handleScroll}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              key={index}
              className="flex-row items-center justify-start mx-2"
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("MovieScreen", item)}
                className="my-3"
              >
                <Image
                  source={{
                    uri: image185(item?.poster_path) || fallbackposter,
                  }}
                  style={{ width: width * 0.29, height: height * 0.22 }}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <FilmIcon size="50" color="white" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MoviesTab;
