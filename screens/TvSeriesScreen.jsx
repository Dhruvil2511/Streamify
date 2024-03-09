import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ChevronLeftIcon,
  HeartIcon,
  ListBulletIcon,
} from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Svg, { Path, Polygon, Circle } from "react-native-svg";
import {
  fallbackposter,
  fetchSeasonData,
  fetchSeriesCredits,
  fetchSeriesDetails,
  fetchSimilarSeries,
  image185,
  image342,
  original,
} from "../api/movieDb";

import DropDownPicker from "react-native-dropdown-picker";

const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";
const { width, height } = Dimensions.get("window");

const TvSeriesScreen = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [open, setOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [seriesDetails, setSeriesDetails] = useState({});
  const [id, setId] = useState();
  const [similarSeries, setSimilarSeries] = useState([]);
  const [seasonsList, setSeasonsList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);

  const fetchData = async () => {
    const seriesDetailsData = await fetchSeriesDetails(item.id);
    if (seriesDetailsData) {
      setSeriesDetails(seriesDetailsData);
      setId(seriesDetailsData.id);

      const filteredSeasons = seriesDetailsData.seasons.filter(
        (season) => season.episode_count !== 0
      );

      const seasonsWithLabelValue = filteredSeasons.map((season) => ({
        ...season,
        label: `${season.name}`,
        value: season.season_number,
      }));
      setSeasonsList(seasonsWithLabelValue);
    }

    const seriesCast = await fetchSeriesCredits(item.id);
    if (seriesCast && seriesCast.cast) setCast(seriesCast.cast);

    const similarSeries = await fetchSimilarSeries(item.id);
    if (similarSeries && similarSeries.results)
      setSimilarSeries(similarSeries.results);
  };

  const getSeasonData = async () => {
    setEpisodesLoading(true);
    const seasonDetailsData = await fetchSeasonData(item.id, selectedSeason);
    if (seasonDetailsData) {
      setEpisodes(seasonDetailsData.episodes);
    }
    setEpisodesLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getSeasonData();
  }, [selectedSeason]);

  const renderEpisodes = ({ item: episode }) => {
    return (
      <View className="my-2 flex-row justify-start items-start">
        <View className="flex-1 justify-start items-start">
          <TouchableOpacity
            onPress={() =>
              navigation.push("Player", {
                id: item.id,
                episode: episode.episode_number,
                season: episode.season_number,
              })
            }
            className="absolute z-20 top-0 left-0 w-full h-48 flex justify-center items-center"
          >
            <Svg
              fill="#ffffff"
              width="50px"
              height="50px"
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
                  stroke: "rgba(255,255,255,0.8)",
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
                  stroke: "rgba(255,255,255,0.8)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              />
            </Svg>
          </TouchableOpacity>
          <View className="flex-1  justify-start items-start mx-3 ">
            <Image
              className="rounded-xl"
              source={{ uri: image342(episode.still_path) }}
              style={{ width: width * 0.8, height: 200 }}
            />
            <View className="flex-row mt-3 justify-start items-start">
              <View className="flex-row justify-center items-center">
                <Text className="text-neutral-500 text-lg">
                  {episode?.episode_number} •
                </Text>
                <Text
                  className="ml-1 text-lg text-white text-left font-bold "
                  numberOfLines={2}
                >
                  {episode?.name.length > 30
                    ? episode.name.slice(0, 30) + "..."
                    : episode.name}
                </Text>
              </View>
            </View>
            <View className="flex-1 mt-2  w-full justify-start items-start">
              <Text className="text-neutral-600 ">{episode?.air_date}</Text>
              <Text className="text-neutral-600 ">
                Rating: {episode?.vote_average}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
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

      <View className="w-full">
        <Image
          className="rounded-xl"
          source={{
            uri: seriesDetails?.backdrop_path
              ? original(seriesDetails.backdrop_path)
              : fallbackposter,
          }}
          style={{ width, height: height * 0.55 }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)", "rgba(10,10,10,1)"]}
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
              uri: image185(seriesDetails.poster_path) || fallbackposter,
            }}
            className="rounded-xl"
            style={{ width: width * 0.33, height: height * 0.22 }}
          />
          <View className="flex-col justify-center items-center">
            <View className="flex-row">
              <Text className="text-white text-center text-3xl font-bold flex-1 flex-wrap">
                {seriesDetails.original_name}
              </Text>
            </View>
            <View>
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {seriesDetails?.first_air_date?.split("-")[0]} •{" "}
                {seriesDetails?.number_of_episodes} episodes
              </Text>
            </View>
            <View className="mt-5 w-52 flex-row justify-around items-center">
              <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
              </TouchableOpacity>
              <View className="flex-col justify-center items-center">
                <Text className="text-white text-md">Average Rating</Text>
                <Text className="text-neutral-500 text-sm font-bold">
                  {seriesDetails.vote_average}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView horizontal>
          <View className="flex-row justify-center mx-4  space-x-2">
            {seriesDetails.genres?.map((genre, index) => (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center flex  flex-wrap"
              >
                {genre?.name}{" "}
                {index < seriesDetails.genres.length - 1 ? "•" : ""}
              </Text>
            ))}
          </View>
        </ScrollView>
        <Text className="text-neutral-400 mx-4 tracking-wide ">
          {seriesDetails?.overview}
        </Text>
      </View>
      <View className="mt-8 mx-5 ">
        <DropDownPicker
          textStyle={{ color: "white" }}
          labelStyle={{
            fontWeight: "bold",
          }}
          modalContentContainerStyle={{
            backgroundColor: "rgb(10,10,10)",
            width: "100%",
          }}
          modalAnimationType="slide"
          modalTitle="Select a season"
          open={open}
          autoScroll={true}
          value={selectedSeason}
          items={seasonsList}
          theme="DARK"
          listMode="MODAL"
          setOpen={setOpen}
          defaultValue={selectedSeason}
          setValue={setSelectedSeason}
          placeholder="Select Season"
          setItems={setSeasonsList}
        />
      </View>
      <View className="mx-5 my-2">
        <Text className="text-white text-2xl">Episodes</Text>
        {episodesLoading ? (
          <View className="w-full my-2 flex-1 justify-center items-center">
            <ActivityIndicator size={50} color="white" />
          </View>
        ) : (
          <FlatList
            horizontal
            data={episodes}
            renderItem={renderEpisodes}
            keyExtractor={(_, index) => index.toString()}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
          />
        )}

        {cast.length > 0 && <Cast cast={cast} />}
        {similarSeries.length > 0 && (
          <MovieList
            title="Similar Series"
            hideSeeAll={true}
            data={similarSeries}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default TvSeriesScreen;
