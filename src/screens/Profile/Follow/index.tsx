import { Text, View } from "react-native";

interface FollowProps {
  title: string;
  value?: number;
}

export function Follow({ title, value = 0 }: FollowProps) {
  return (
    <View className="flex items-center">
      <Text className="text-zinc-50 font-medium">
        {value}
      </Text>
      
      <Text className="text-zinc-50 font-medium">
        {title}
      </Text>
    </View>
  )
}