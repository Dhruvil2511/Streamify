import { View, Text, Platform, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import { ScrollView } from "react-native";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import {
  fetchLatestMovies,
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/movieDb";
const ios = Platform.OS === "ios";

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const navigation = useNavigation();

  async function getTrendingMovies() {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrendingMovies(shuffle(data.results));
  }
  async function getUpcomingMovies() {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcomingMovies(data.results);
  }
  async function getTopRatedMovies() {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRatedMovies(data.results);
  }
  async function getPopularMovies() {
    const data = await fetchPopularMovies();
    if (data && data.results) setPopularMovies(shuffle(data.results));
  }
  async function getNowPlayingMovies() {
    const data = await fetchNowPlayingMovies();
    if (data && data.results) setNowPlayingMovies(shuffle(data.results));
  }
  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getPopularMovies();
    getNowPlayingMovies();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <View className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center w-100 mx-4">
          <View className="flex-row justify-start items-center">
            <View>
              <Image
                source={require("../assets/icon.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View>
              <Text className="text-white text-2xl font-bold">Streamify</Text>
            </View>
          </View>
          <View className="flex-row justify-start items-center">
            <View className="px-5">
              <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <MagnifyingGlassIcon size={35} strokeWidth={2} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <UserCircleIcon size={35} strokeWidth={2} color="white" />
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending Movies carousel */}
        {trendingMovies.length > 0 && <TrendingMovies data={trendingMovies} />}
        <MovieList title="Upcoming Movies" data={upcomingMovies} />
        <MovieList title="Top Rated Movies" data={topRatedMovies} />
        <MovieList title="Now Playing Movies" data={nowPlayingMovies} />
        <MovieList title="Popular Movies" data={popularMovies} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
