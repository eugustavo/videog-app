import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Avatar } from "@components/Avatar";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

interface AuthorProps {
  userName: string;
  userAvatar: string;
  userId: string;
}

export function Author({ userName, userAvatar, userId }: AuthorProps) {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToProfile() {
    navigate("Profile", { userId })
  }

  return (
    <TouchableOpacity
      onPress={handleNavigateToProfile} 
      className="flex flex-row items-center mb-2"
    >
      <Avatar avatar_url={userAvatar} />

      <Text
        className="text-zinc-50 font-bold text-lg mb-1 ml-2"
        style={{
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1.8 },
          textShadowRadius: 2
        }}
      >
        {userName}
      </Text>
    </TouchableOpacity>
  )
}