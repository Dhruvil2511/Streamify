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
import {
  fallbackposter,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image185,
  image500,
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
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 w-full flex-row justify-between px-5 py-5 ${topMargin}`}
        >
          <TouchableOpacity
            className="rounded-xl p-1 bg-blue-600"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      <View>
        <Image
          className="rounded-xl"
          source={{
            uri: movieDetails?.backdrop_path
              ? image500(movieDetails.backdrop_path)
              : fallbackposter,
          }}
          style={{ width, height: height * 0.55 }}
        />
        <LinearGradient
          colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
          style={{ width, height: height * 0.4 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
      </View>

      <View style={{marginTop:-100}} className="space-y-3">
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
