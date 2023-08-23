import { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon, Send } from "lucide-react-native";

import { useComment } from "@hooks/video/useComment";
import { useSendComment } from "@hooks/video/useSendComment";
import { ListComments } from "./ListComments";
import { useAuth } from "@hooks/useAuth";

interface VideoCommentsRouteProps {
  videoId: string;
}

export function VideoComments() {
  const [sendCommentText, setSendCommentText] = useState('')

  const { user } = useAuth()
  const { params } = useRoute<RouteProp<Record<string, VideoCommentsRouteProps>, string>>();
  const { goBack, isFocused } = useNavigation();

  const { data, refetch, isLoading } = useComment({
    video_id: params?.videoId,
  })
  const { mutate } = useSendComment({
    author_id: user.id,
    video_id: params?.videoId,
    content: sendCommentText,
  })

  async function handleSendComment() {
    mutate({ mutationKey: ['sendComment', {
      author_id: user.id,
      video_id: params?.videoId,
      content: sendCommentText,
    }]});

    setSendCommentText('');
  }

  useEffect(() => {
    refetch();
  }, [isFocused, handleSendComment])

  return (
    <View className="flex flex-1 bg-black px-6">
      <View className="flex flex-row w-full items-center justify-center mt-20 mb-4">
        <TouchableOpacity onPress={goBack}>
          <ChevronLeftIcon className="w-6 h-6 text-zinc-50" />
        </TouchableOpacity>

        <View className="flex flex-1">
          <Text className="text-zinc-50 text-center font-medium text-lg">Comentários</Text>
        </View>
      </View>

      {data?.length !== 0 ? (
        <ListComments comments={data} />
      ):(
        <View className="flex flex-1 items-center justify-center">
          <Text className="text-zinc-50">
            Nenhum comentário encontrado, seja o primeiro!
          </Text>
        </View>
      )}

      {isLoading && (
        <Text className="text-zinc-50 text-center text-sm mb-4">
          Carregando...
        </Text>
      )}

      <View className="flex flex-row items-center mb-2">
        <TextInput
          className="flex h-10 w-[85%] rounded-md border border-zinc-400 text-zinc-200 px-2 mr-2"
          placeholder="Adicione um comentário"
          placeholderTextColor="#9CA3AF"
          value={sendCommentText}
          onChangeText={setSendCommentText}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity onPress={handleSendComment}>
          <Send className="text-zinc-400 ml-4" />
        </TouchableOpacity>
      </View>
    </View>
  )
}