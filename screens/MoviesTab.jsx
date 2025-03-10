import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchRegionalMovies,
  fetchTopRatedMovies,
} from "../api/movieDb";
import { FilmIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MovieItem from "../components/MovieItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MoviesTab = () => {
  const { params: title } = useRoute();
  const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("US");
  const [currentActive, setCurrentActive] = useState("Popular Movies");
  const [refreshing, setRefreshing] = useState(false); // New state for refreshing

  const fetchData = async (page) => {
    setIsLoading(true);
    if (page === 1) setResults([]);

    let data;
    switch (currentActive) {
      case "Popular Movies":
        data = await fetchPopularMovies({ page });
        break;
      case "Top Rated Movies":
        data = await fetchTopRatedMovies({ page });
        break;
      case "Now Playing Movies":
        data = await fetchNowPlayingMovies({ page });
        break;
      case "Regional Movies":
        await fetchCountry();
        data = await fetchRegionalMovies({ page, country: country });
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
    setRefreshing(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (title) setCurrentActive(title);
    fetchCountry()
  }, [title]);

  const fetchCountry = async () => {
    try {
      const country = await AsyncStorage.getItem("selectedCountry");
      if (country) setCountry(country);

    } catch (error) {
      console.log(error); 
      
    }
  };


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, currentActive]);

  const handleScroll = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderMovieItem = ({ item }) => (
    <MovieItem item={item} title={currentActive} />
  );

  return (
    <>
      <View className="bg-neutral-950 flex-1">
        {/* <TopBar /> */}
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
              setCurrentActive("Popular Movies");
              setCurrentPage(1);
            }}
            style={{
              backgroundColor:
                currentActive === "Popular Movies"
                  ? "rgba(229,64,107,0.9)"
                  : "transparent",
              borderRadius: 5,
            }}
          >
            <Text className="text-white px-3 opacity-100 py-1">Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl"

            onPress={() => {
              setCurrentActive("Top Rated Movies");
              setCurrentPage(1);
            }}
            style={{
              backgroundColor:
                currentActive === "Top Rated Movies"
                  ? "rgba(229,64,107,0.9)"
                  : "transparent",
              borderRadius: 5,
            }}
          >
            <Text className="text-white px-3 py-1">Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl"

            onPress={() => {
              setCurrentActive("Now Playing Movies");
              setCurrentPage(1);
            }}
            style={{
              backgroundColor:
                currentActive === "Now Playing Movies"
                  ? "rgba(229,64,107,0.9)"
                  : "transparent",
              borderRadius: 5,
            }}
          >
            <Text className="text-white px-3 py-1">Latest</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl"

            onPress={() => {
              setCurrentActive("Regional Movies");
              setCurrentPage(1);
            }}
            style={{
              backgroundColor:
                currentActive === "Regional Movies"
                  ? "rgba(229,64,107,0.9)"
                  : "transparent",
              borderRadius: 5,
            }}
          >
            <Text className="text-white px-3 py-1">Regional</Text>
          </TouchableOpacity>
        </View>
        {results.length > 0 ? (
          <FlatList
            data={results}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={handleScroll}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            contentContainerStyle={{ paddingVertical: 10 }}
            refreshControl={
              // Add refreshControl prop to FlatList
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true); // Set refreshing state to true when refresh is triggered
                  setCurrentPage(1); // Reset current page to 1
                  fetchData(1); // Fetch data for the first page
                }}
                colors={["rgba(229,64,107,1)"]} // Set colors for the refresh indicator
                tintColor={"rgba(229,64,107,1)"} // Set tint color for the refresh indicator
              />
            }
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <FilmIcon size={50} color="white" />
          </View>
        )}
      </View>
    </>
  );
};

export default MoviesTab;
