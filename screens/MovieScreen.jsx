import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Svg, { Path, Polygon, Circle } from "react-native-svg";
import {
  fallbackposter,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image185,
  original,
} from "../api/movieDb";

const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";
const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const movieDetailsData = await fetchMovieDetails(item.id);
      if (movieDetailsData) setMovieDetails(movieDetailsData);

      const movieCreditsData = await fetchMovieCredits(item.id);
      if (movieCreditsData && movieCreditsData.cast)
        setCast(movieCreditsData.cast);

      const similarMoviesData = await fetchSimilarMovies(item.id);
      if (similarMoviesData && similarMoviesData.results)
        setSimilarMovies(similarMoviesData.results);
    };
    fetchData();
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-950"
    >
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-50 w-full flex-row justify-between px-5 py-5 ${topMargin}`}
        >
          <TouchableOpacity
            className="rounded-xl p-1 bg-blue-600"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Svg
              fill="white"
              width="35px"
              height="35px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                fillRule="evenodd"
                d="M1,21 L1,19 C2.1045695,19 3,19.8954305 3,21 L1,21 Z M7,21 L5,21 C5,18.790861 3.209139,17 1,17 L1,15 C4.3137085,15 7,17.6862915 7,21 Z M11,21 L9,21 C9,16.581722 5.418278,13 1,13 L1,11 C6.5228475,11 11,15.4771525 11,21 Z M3,9 L1,9 L1,5 C1,3.8954305 1.8954305,3 3,3 L21,3 C22.1045695,3 23,3.8954305 23,5 L23,19 C23,20.1045695 22.1045695,21 21,21 L13,21 L13,19 L21,19 L21,5 L3,5 L3,9 Z"
              />
            </Svg>
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.push("Player", movieDetails.id)}
          className="absolute z-20 top-0 left-0 w-full h-full flex justify-center items-center"
        >
          <Svg
            fill="#ffffff"
            width="100px"
            height="100px"
            viewBox="0 0 24 24"
            id="play"
            data-name="Line Color"
            xmlns="http://www.w3.org/2000/svg"
            className="icon line-color"
          >
            <Polygon
              id="secondary"
              points="16 12 10 16 10 8 16 12"
              style={{
                fill: "none",
                stroke: "rgba(255,255,255,0.5)",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
              }}
            />
            <Circle
              id="primary"
              cx={12}
              cy={12}
              r={9}
              style={{
                fill: "none",
                stroke: "rgba(255,255,255,0.5)",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
              }}
            />
          </Svg>
        </TouchableOpacity>
        <Image
          className="rounded-xl"
          source={{
            uri: movieDetails?.backdrop_path
              ? original(movieDetails.backdrop_path)
              : fallbackposter,
          }}
          style={{ width, height: height * 0.55 }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]}
          style={{ width, height: height * 0.4 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
      </View>

      <View style={{ marginTop: -100 }} className="space-y-3">
        <View className="mx-4 flex-row justify-around items-center">
          <Image
            source={{
              uri: image185(movieDetails.poster_path) || fallbackposter,
            }}
            className="rounded-xl"
            style={{ width: width * 0.33, height: height * 0.22 }}
          />
          <View className="flex-col justify-center items-center">
            <View className="flex-row">
              <Text className="text-white text-center text-3xl font-bold flex-1 flex-wrap">
                {movieDetails.title}
              </Text>
            </View>
            <View>
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movieDetails.status} •{" "}
                {movieDetails?.release_date?.split("-")[0]} •{" "}
                {movieDetails?.runtime} min
              </Text>
            </View>
            <View className="mt-5 w-52 flex-row justify-around items-center">
              <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
              </TouchableOpacity>
              <View className="flex-col justify-center items-center">
                <Text className="text-white text-md">Average Rating</Text>
                <Text className="text-neutral-500 text-sm font-bold">
                  {movieDetails.vote_average}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row justify-center mx-4  space-x-2">
          {movieDetails.genres?.map((genre, index) => (
            <Text
              key={index}
              className="text-neutral-400 font-semibold text-base text-center"
            >
              {genre?.name} {index < movieDetails.genres.length - 1 ? "•" : ""}
            </Text>
          ))}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide ">
          {movieDetails?.overview}
        </Text>
      </View>
      {cast.length > 0 && <Cast cast={cast} />}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
