import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { Loading } from "@components/Loading";
import { useAuth } from '@hooks/useAuth';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme;
  theme.colors.background = "#000";

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <View className="flex flex-1 bg-black">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}