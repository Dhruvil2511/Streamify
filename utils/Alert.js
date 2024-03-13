import { Alert } from "react-native";

export const showAlert = () => {
  Alert.alert(
    "Error⚠️", // Optional title
    "Error fetching content!\nPlease check your internet or reach out to admin.",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }]
  );
};
