import { Platform } from "react-native";

export const tabBar = {
  backgroundColor: "#000",
  borderTopWidth: 1,
  borderTopColor: "#2a2a2a",
  height: Platform.OS === "android" ? 66 : 96,
  paddingBottom: Platform.OS === "android" ? 6*4 : 12*4,
  paddingTop: 6*4
}