import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
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
  fetchSearchedMovie,
  image185,
  image342,
} from "../api/movieDb";
const { width, height } = Dimensions.get("window");
const Search = () => {
  const [results, setResults] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const navigation = useNavigation();

  async function handleSearchQuery() {
    if (searchQ.trim() === "") return;

    const params = {
      query: searchQ,
      include_adult: true,
      language: "en-US",
      page: 1,
    };
    fetchSearchedMovie(params)
      .then((data) => (data && data.results ? setResults(data.results) : []))
      .catch((err) => console.error(err));
  }
  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <View className="flex-row justify-center w-full items-center">
        <View className="my-3 w-96  flex-row justify-between items-center border border-neutral-500 rounded-xl">
          <TouchableOpacity
            className="rounded-xl p-3 m-1 bg-blue-500"
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
            onChangeText={(newText) => setSearchQ(newText)}
            className="px-5 py-4 flex-1 text-base font-semibold text-white tracking-wider"
          />
          <TouchableOpacity
            className="rounded-xl p-3 m-1 bg-neutral-500"
            onPress={() => handleSearchQuery()}
          >
            <MagnifyingGlassIcon size="25" color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      {results.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} className="space-y-2">
          <Text className="text-white font-semibold m-1">
            Results ({results.length})
          </Text>

          <View className="flex-row flex-wrap justify-between  mx-5 my-5">
            {results.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                >
                  <Image
                    source={{
                      uri: image185(item?.poster_path) || fallbackposter,
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <View className="space-y-2 mb-4 ">
                    <Text className="text-center text-neutral-300 mb-1">
                      {item.title.length > 20
                        ? item.title.slice(0, 20) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
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
