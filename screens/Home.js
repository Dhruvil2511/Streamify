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
  fetchPopularSeries,
  fetchTopRatedMovies,
  fetchTopRatedSeries,
  fetchTrendingMovies,
  fetchTrendingSeries,
  fetchUpcomingMovies,
} from "../api/movieDb";
import TopBar from "../components/TopBar";
import * as Progress from "react-native-progress";

const shuffle = (array) => {
  for (let i = array?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const Home = () => {
  const [trending, setTrending] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  async function getTrendingMovies() {
    const moviesData = await fetchTrendingMovies();
    if (moviesData && moviesData.results) {
      setTrending((prevTrending) => {
        return [...prevTrending, ...moviesData.results];
      });
    }
  }

  async function getTrendingSeries() {
    const seriesData = await fetchTrendingSeries();
    if (seriesData && seriesData.results) {
      setTrending((prevTrending) => {
        return [...prevTrending, ...seriesData.results];
      });
    }
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
  async function getTopRatedSeries() {
    const data = await fetchTopRatedSeries();
    if (data && data.results) setTopRatedSeries(data.results);
  }

  useEffect(() => {
    setIsLoading(true);
    getTrendingMovies();
    getTrendingSeries();
    getTopRatedMovies();
    getTopRatedSeries();
    getPopularMovies();
    getNowPlayingMovies();
    setTrending(shuffle(trending));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
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
            <TrendingMovies data={trending} />
            <MovieList title="Top Rated Movies" data={topRatedMovies} />
            <MovieList title="Top Rated Series" data={topRatedSeries} />
            <MovieList title="Popular Movies" data={popularMovies} />
            <MovieList title="Now Playing Movies" data={nowPlayingMovies} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
