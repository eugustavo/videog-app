import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { randomUUID } from "expo-crypto";
import { ChevronLeft, LogOut } from "lucide-react-native";

import { Divider } from "@components/Divider";
import { useAuth } from "@hooks/useAuth";
import { useFollow } from "@hooks/profile/useFollow";
import { useProfile } from "@hooks/profile/useProfile";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { tabBar } from "@styles/tabBar";
import { Header } from "./Header";

const userProfileData = [
  {
    id: 1,
    thumbnail: "https://github.com/eugustavo.png"
  },
  {
    id: 2,
    thumbnail: "https://github.com/eugustavo.png"
  },
  {
    id: 3,
    thumbnail: "https://github.com/eugustavo.png"
  },
  {
    id: 4,
    thumbnail: "https://github.com/eugustavo.png"
  },
]

interface ProfileRouteProps {
  userId?: string;
}

export function Profile() {
  const [hasUserId, setHasUserId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signOut, user } = useAuth();
  const { setOptions, isFocused, goBack, setParams } = useNavigation<AppNavigatorRoutesProps>();
  const { params } = useRoute<RouteProp<Record<string, ProfileRouteProps>, string>>();

  const { data, refetch } = useProfile({
    user_id: params?.userId || user.id,
    follow_user_id: params?.userId && user.id
  })
  const { mutateAsync } = useFollow({
    user_id: user.id,
    follow_user_id: params?.userId
  })
  const hasFollowed = data?.hasFollowed;

  function handleGoBack() {
    setParams({ userId: undefined });
    setHasUserId(false);

    goBack();
    setOptions({ tabBarStyle: tabBar })

    return true;
   }

  async function handleFollow() {
    setIsLoading(true);

    await mutateAsync({
      mutationKey: ['follow', { user_id: user.id, follow_user_id: params?.userId }]
    });
    await refetch();

    setIsLoading(false);
  }

  useEffect(() => {
    refetch();
    
    if (params?.userId) {
      setHasUserId(true);

      return setOptions({
        tabBarStyle: {
          display: "none"
        },
      })
    }
  }, [params?.userId, isFocused])

  BackHandler.addEventListener('hardwareBackPress', handleGoBack)

  return (
    <SafeAreaView className="flex flex-1">
      {hasUserId ? (
        <TouchableOpacity onPress={handleGoBack} className="flex-row items-center mt-2">
          <ChevronLeft className="ml-4 text-zinc-200" />
          <Text className="text-zinc-200 ml-1 font-medium">
            Voltar
          </Text>
        </TouchableOpacity>
      ):(
        <TouchableOpacity onPress={signOut} className="flex-row justify-end mt-2">
          <LogOut className="mr-6 text-zinc-200" />
        </TouchableOpacity>
      )}

      <Header
        user={data?.user}
        followers={data?.followers}
        following={data?.following}
        handleFollow={handleFollow}
        isLoading={isLoading}
        hasUserId={hasUserId}
        hasFollowed={hasFollowed}
      />
      
      <Divider />

      <FlatList
        data={userProfileData}
        keyExtractor={item => randomUUID()}
        numColumns={3}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.thumbnail }}
            className="w-32 h-32 m-[1px]"
          />
        )}
      />
    </SafeAreaView>
  )
}