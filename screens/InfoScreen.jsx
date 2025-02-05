import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import countries from "../utils/countries.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { LinearGradient, Stop, Defs, Path } from "react-native-svg";

const InfoScreen = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(countries.results);

  useEffect(() => {
    const manageSelectedCountry = async () => {
      try {
        if (value) {
          await AsyncStorage.setItem("selectedCountry", value);
        } else {
          const storedValue = await AsyncStorage.getItem("selectedCountry");
          if (storedValue) {
            setValue(storedValue);
          }
        }
      } catch (error) {
        console.error("Error managing selected country:", error);
      }
    };
    manageSelectedCountry();
  }, [value]);




  return (
    <SafeAreaView className="pt-6 bg-neutral-950 flex-1">
      <View className="flex-row justify-center items-center">
        <Text className="text-white text-xl font-bold">
          Information about project
        </Text>
      </View>


      <View
        className={`absolute z-50 w-full flex-row justify-between px-5 py-5 `}
      >
        <TouchableOpacity
          className="rounded-xl p-1 bg-blue-600"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center">

        <Svg width={100} height={35} viewBox="0 0 273.42 35.52">
          <Defs>
            <LinearGradient id="linear-gradient" x1="0" y1="17.76" x2="273.42" y2="17.76" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor="#90cea1" />
              <Stop offset="0.56" stopColor="#3cbec9" />
              <Stop offset="1" stopColor="#00b3e5" />
            </LinearGradient>
          </Defs>
          <Path
            fill="url(#linear-gradient)"
            d="M191.85,35.37h63.9A17.67,17.67,0,0,0,273.42,17.7h0A17.67,17.67,0,0,0,255.75,0h-63.9A17.67,17.67,0,0,0,174.18,17.7h0A17.67,17.67,0,0,0,191.85,35.37ZM10.1,35.42h7.8V6.92H28V0H0v6.9H10.1Zm28.1,0H46V8.25h.1L55.05,35.4h6L70.3,8.25h.1V35.4h7.8V0H66.45l-8.2,23.1h-.1L50,0H38.2ZM89.14.12h11.7a33.56,33.56,0,0,1,8.08,1,18.52,18.52,0,0,1,6.67,3.08,15.09,15.09,0,0,1,4.53,5.52,18.5,18.5,0,0,1,1.67,8.25,16.91,16.91,0,0,1-1.62,7.58,16.3,16.3,0,0,1-4.38,5.5,19.24,19.24,0,0,1-6.35,3.37,24.53,24.53,0,0,1-7.55,1.15H89.14Zm7.8,28.2h4a21.66,21.66,0,0,0,5-.55A10.58,10.58,0,0,0,110,26a8.73,8.73,0,0,0,2.68-3.35,11.9,11.9,0,0,0,1-5.08,9.87,9.87,0,0,0-1-4.52,9.17,9.17,0,0,0-2.63-3.18A11.61,11.61,0,0,0,106.22,8a17.06,17.06,0,0,0-4.68-.63h-4.6ZM133.09.12h13.2a32.87,32.87,0,0,1,4.63.33,12.66,12.66,0,0,1,4.17,1.3,7.94,7.94,0,0,1,3,2.72,8.34,8.34,0,0,1,1.15,4.65,7.48,7.48,0,0,1-1.67,5,9.13,9.13,0,0,1-4.43,2.82V17a10.28,10.28,0,0,1,3.18,1,8.51,8.51,0,0,1,2.45,1.85,7.79,7.79,0,0,1,1.57,2.62,9.16,9.16,0,0,1,.55,3.2,8.52,8.52,0,0,1-1.2,4.68,9.32,9.32,0,0,1-3.1,3A13.38,13.38,0,0,1,152.32,35a22.5,22.5,0,0,1-4.73.5h-14.5Z"
          />
        </Svg>
        <Text className="text-left text-white text-md mx-3">
          This product uses the TMDB API for listing content but is not endorsed or certified by TMDB.{"\n"}
          This app was created for learning and project purposes with no intent to commercialize.
        </Text>
      </View>
      <View className="flex-1 justify-center items-start w-full">
        <View className="my-1">
          <Text className=" text-left text-md text-neutral-500 mx-3">
            📜 Disclaimer :{"\n\n"}
            Streamify is only an interface that provides links to third-party websites hosting movies and TV shows. This app does not host, store, or distribute any content. All media is provided by publicly available third-party services.
            We do not claim ownership, affiliation, or endorsement of the content available through these external links. All trademarks, copyrights, and media belong to their respective owners.
            If you are a content owner and believe your copyrighted material is linked improperly, please contact the respective third-party provider to request content removal. We do not have control over external content.{"\n"}
            All code and design are open-source and available on GitHub.
          </Text>
        </View>
      </View>
      <View className="my-5 mx-5 ">
        <Text className="text-white text-md my-5 font-bold">Select your country</Text>
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
          modalTitle="Select a Country"
          placeholder="Select Country"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(selected) => { setValue(selected) }}
          autoScroll={true}
          setItems={setItems}
          theme="DARK"
          listMode="MODAL"
        />
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;
