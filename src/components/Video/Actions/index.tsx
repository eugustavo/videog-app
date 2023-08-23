import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as Sharing from 'expo-sharing';
import { useNavigation } from "@react-navigation/native";
import { Heart, MessageCircle, Send } from "lucide-react-native";

import { useAuth } from "@hooks/useAuth";
import { useReaction } from "@hooks/video/useReaction";
import { useHasLiked } from "@hooks/video/useHasLiked";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

interface ActionsProps {
  videoId: string;
  videoUrl: string;
}

export function Actions({ videoId, videoUrl }: ActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const likeColor = isLiked ? '#FF0000' : '#fff';

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const { user } = useAuth();
  const { mutate } = useReaction({
    user_id: user.id,
    video_id: videoId,
  })
  const { data, isFetched } = useHasLiked({
    user_id: user.id,
    video_id: videoId,
  })

  function handleLike() {
    setIsLiked(!isLiked);
    mutate({ mutationKey: ['videoReaction', {
      user_id: user.id,
      video_id: videoId,
    }] });
  }

  function handleNavigateToComments() {
    navigate('VideoComments', { videoId });
  }

  async function handleShareVideo() {
    await Sharing.shareAsync('');
  }

  useEffect(() => {
    if (isFetched && data) {
      setIsLiked(data);
    }
  }, [isFetched])

  return (
    <View className="gap-6">
      <TouchableOpacity onPress={handleLike}>
        <Heart size={32} color={likeColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNavigateToComments}>
        <MessageCircle size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleShareVideo}>
        <Send size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}