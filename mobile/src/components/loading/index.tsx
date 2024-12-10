import { colors } from "@/styles/theme";
import { ActivityIndicator } from "react-native";
import { s } from "./style";

export function Loading() {
  return <ActivityIndicator color={colors.green.base} style={s.container} />
}