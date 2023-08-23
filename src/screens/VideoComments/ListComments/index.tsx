import { FlatList, Text, View } from "react-native";

import { CommentDTO } from "@dtos/CommentDTO";
import { Avatar } from "@components/Avatar";

interface ListCommentsProps {
  comments: CommentDTO[] | undefined;
}

export function ListComments({ comments }: ListCommentsProps) {
  return (
    <FlatList
      data={comments}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View className="flex flex-row mb-8 items-start">
          <Avatar avatar_url={item.author_id.avatar_url} />

          <View className="flex flex-col ml-2 w-[90%]">
            <Text className="text-zinc-50 font-bold mb-1">{item.author_id.name}</Text>

            <Text className="text-zinc-200 text-xs">{item.content}</Text>
          </View>
        </View>
      )}
    />
  )
}