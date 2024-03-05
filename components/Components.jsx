import { View, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
const { width, height } = Dimensions.get("window");

const Components = () => {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center"
    >
      <Progress.CircleSnail thickness={10} size={150} color="blue" />
    </View>
  );
};

export default Components;
