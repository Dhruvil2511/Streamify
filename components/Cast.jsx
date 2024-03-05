import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { fallbackposter, image185 } from "../api/movieDb";

const Cast = ({ cast }) => {
  return (
    <View className="my-5 mx-5">
      <Text className="text-white text-lg my-5">Top Cast</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity key={index} className="mr-4 items-center ">
                <Image
                  className=" rounded-full h-20 w-20 "
                  source={{
                    uri: person?.profile_path
                      ? image185(person.profile_path)
                      : fallbackposter,
                  }}
                />
                <Text className="text-white text-xs mt-1">
                  {person?.character?.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>
                <Text className="text-white text-xs mt-1">
                  {person?.original_name?.length > 10
                    ? person.original_name.slice(0, 10) + "..."
                    : person.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
