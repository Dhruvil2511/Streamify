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
  fetchAiringTodaySeries,
  fetchLatestSeries,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchPopularSeries,
  fetchTopRatedMovies,
  fetchTopRatedSeries,
  image185,
} from "../api/movieDb";

import * as Progress from "react-native-progress";
import MovieItem from "../components/MovieItem";

const TvSeriesTab = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);
  const { params: title } = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [currentActive, setCurrentActive] = useState("popular");

  const fetchData = async (page) => {
    setIsLoading(true);
    if (page === 1) setResults([]);

    let data;
    switch (currentActive) {
      case "popular":
        data = await fetchPopularSeries({ page });
        break;
      case "toprated":
        data = await fetchTopRatedSeries({ page });
        break;
      case "latest":
        data = await fetchLatestSeries({ page });
        break;
      default:
        break;
    }

    if (data && data.results) {
      setResults((prevResults) => {
        const existingIds = new Set(prevResults.map((item) => item.id));
        const filteredResults = data.results.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prevResults, ...filteredResults];
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (title) setCurrentActive("toprated");
  }, [title]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, currentActive]);

  const handleScroll = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderSeriesItem = ({ item }) => <MovieItem item={item} />;

  return (
    <>
      <SafeAreaView className="bg-neutral-950 flex-1">
        <TopBar />
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
            onPress={() => {
              setCurrentActive("popular");
              setCurrentPage(1);
            }}
            style={{
              backgroundColor:
                currentActive === "popular"
                  ? "rgba(229,64,107,0.9)"
                  : "transparent",
              borderRadius: 5,
            }}
          >
            <Text className="text-white px-3 opacity-100">Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setCurrentActive("toprated");
              setCurrentPage(1);
            }}
            style={{
              backgroundColor:
                currentActive === "toprated"
                  ? "rgba(229,64,107,0.9)"
                  : "transparent",
              borderRadius: 5,
            }}
          >
            <Text className="text-white px-3">Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl"
            onPress={() => {
              setCurrentActive("latest");
              setCurrentPage(1);
            }}
            style={{
              backgroundColor:
                currentActive === "latest"
                  ? "rgba(229,64,107,0.9)"
                  : "transparent",
              borderRadius: 5,
            }}
          >
            <Text className="text-white px-3">Latest</Text>
          </TouchableOpacity>
        </View>
        {results.length > 0 ? (
          <FlatList
            data={results}
            renderItem={renderSeriesItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleScroll}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
            numColumns={3}
            contentContainerStyle={{ paddingVertical: 10 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <FilmIcon size="50" color="white" />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default TvSeriesTab;
