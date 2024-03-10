import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
// import { View } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import {
  fetchTrendingMovies,
  fetchTrendingSeries,
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchTopRatedSeries,
} from "../api/movieDb";
import * as Progress from "react-native-progress";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);

  const shuffle = (array) => {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const trendingMoviesData = await fetchTrendingMovies();
        const trendingSeriesData = await fetchTrendingSeries();
        const topRatedMoviesData = await fetchTopRatedMovies();
        const popularMoviesData = await fetchPopularMovies();
        const nowPlayingMoviesData = await fetchNowPlayingMovies();
        const topRatedSeriesData = await fetchTopRatedSeries();

        setTrending(
          shuffle([
            ...trendingMoviesData.results,
            ...trendingSeriesData.results,
          ])
        );
        setNowPlayingMovies(shuffle(nowPlayingMoviesData.results));
        setPopularMovies(shuffle(popularMoviesData.results));
        setTopRatedMovies(topRatedMoviesData.results);
        setTopRatedSeries(topRatedSeriesData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-neutral-950">
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
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
    </View>
  );
};

export default Home;
