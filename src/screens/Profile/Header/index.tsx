import { Text, TouchableOpacity, View } from "react-native";

import { Avatar } from "@components/Avatar";

import { Follow as Followers } from "../Follow";
import { Follow as Following } from "../Follow";

interface HeaderProps {
  user?: {
    name: string;
    avatar_url: string;
  }
  followers?: number;
  following?: number;
  handleFollow: () => void;
  isLoading: boolean;
  hasUserId?: boolean;
  hasFollowed?: boolean;
}

export function Header({ 
  user,
  followers = 0, 
  following = 0, 
  handleFollow, 
  isLoading, 
  hasUserId,
  hasFollowed
}: HeaderProps) {
  const buttonStyle = hasFollowed 
    ? 'items-center py-2 w-full rounded-sm bg-transparent border border-violet-500'
    : 'items-center py-2 w-full rounded-sm bg-violet-500';

  return (
    <>
      <View className="flex flex-row items-center justify-between px-6 mt-6">
        <Avatar avatar_url={user?.avatar_url} />

        <View className="flex flex-1 flex-row items-center justify-between px-14">
          <Followers title="Seguidores" value={followers} />
          <Following title="Seguindo" value={following} />
        </View>
      </View>

      <View className="mt-4 pl-4">
        <Text className="text-zinc-50 font-bold">
          {user?.name}
        </Text>
      </View>

      {hasUserId && (
        <View className="flex items-center mt-4 px-2">
          <TouchableOpacity 
            onPress={handleFollow}
            className={buttonStyle}
          >
            <Text className="text-zinc-50 font-bold">
              {isLoading ? 'Carregando...' : hasFollowed ? 'Seguindo' : 'Seguir'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  )
}