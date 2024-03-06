import { View, Text, Platform, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
import TopBar from "../components/TopBar";
import * as Progress from "react-native-progress";

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
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
    getPopularMovies();
    getNowPlayingMovies();
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <TopBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
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
        ) : (
          <>
            <TrendingMovies data={trendingMovies} />
            <MovieList title="Upcoming Movies" data={upcomingMovies} />
            <MovieList title="Top Rated Movies" data={topRatedMovies} />
            <MovieList title="Now Playing Movies" data={nowPlayingMovies} />
            <MovieList title="Popular Movies" data={popularMovies} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
