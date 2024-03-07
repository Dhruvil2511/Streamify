import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import { FilmIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import {
  fallbackposter,
  fetchSearch,
  image185,
  image342,
} from "../api/movieDb";
import * as Progress from "react-native-progress";
const { width, height } = Dimensions.get("window");
const Search = () => {
  const [results, setResults] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  async function handleSearchQuery() {
    if (searchQ.trim() === "") return;
    setIsLoading(true);

    const params = {
      query: searchQ,
      include_adult: true,
      language: "en-US",
      page: currentPage,
    };
    fetchSearch(params)
      .then((data) =>
        data && data.results
          ? setResults((prevResults) => {
              const existingIds = new Set(prevResults.map((item) => item.id));
              const filteredResults = data.results.filter(
                (item) => !existingIds.has(item.id)
              );
              return [...prevResults, ...filteredResults];
            })
          : []
      )
      .catch((err) => console.error(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  }
  useEffect(() => {
    handleSearchQuery();
  }, [currentPage]);
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
    <SafeAreaView className="bg-neutral-900 flex-1">
      <View className="flex-row justify-center w-full items-center">
        <View className="my-3 w-96  flex-row justify-between items-center border border-neutral-500 rounded-xl">
          <TouchableOpacity
            className="rounded-xl p-3 m-1"
            style={{ backgroundColor: "rgba(229,64,107,1)" }}
            onPress={() => navigation.navigate("Home")}
          >
            <ChevronLeftIcon
              size="25"
              color={"white"}
              className="bg-blue-500"
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search a movie.."
            placeholderTextColor="lightgray"
            onSubmitEditing={()=>handleSearchQuery()}
            onChangeText={(newText) => setSearchQ(newText)}
            className="px-5 py-4 flex-1 text-base font-semibold text-white tracking-wider"
          />
          <TouchableOpacity
            className="rounded-xl p-3 m-1"
            style={{ backgroundColor: "rgba(19,108,170,1)" }}
            onPress={() => handleSearchQuery()}
          >
            <MagnifyingGlassIcon size="25" color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
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
      {results?.length > 0 ? (
        <>
          <Text className="text-white font-semibold m-1 mx-5">
            Results ({results?.length})
          </Text>
          <FlatList
            data={results}
            onScroll={handleScroll}
            className="space-y-2"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  className="flex-row flex-wrap justify-between mx-4"
                >
                  <View className="w-full flex-row my-2 justify-start items-center">
                    <TouchableOpacity
                      onPress={() => {
                        item.media_type === "tv"
                          ? navigation.navigate("TvSeriesScreen", item)
                          : navigation.navigate("MovieScreen", item);
                      }}
                    >
                      <Image
                        source={{
                          uri: image185(item?.poster_path) || fallbackposter,
                        }}
                        style={{
                          width: width * 0.29,
                          height: height * 0.18,
                        }}
                      />
                    </TouchableOpacity>
                    <View className="ml-5 py-2 w-full my-2 flex-col justify-start items-start">
                      <View className="flex-row w-60">
                        <Text
                          className="text-white w-72 font-semibold  text-xl flex-1 flex-wrap"
                          numberOfLines={2}
                        >
                          {item.media_type === "tv"
                            ? item?.name?.length > 30
                              ? item?.name.slice(0, 30) + "..."
                              : item?.name
                            : item?.title?.length > 30
                            ? item?.title.slice(0, 30) + "..."
                            : item?.title}
                          {}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-neutral-500 font-bold text-md">
                          {item?.media_type.toUpperCase()} • Rating :{" "}
                          {item.vote_average}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <FilmIcon size="50" color="white" />
          <Text className="text-white">Your Search will appear here</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
