import { Image } from "react-native";

interface AvatarProps {
  avatar_url?: string;
}

export function Avatar({ avatar_url }: AvatarProps) {
  return (
    <Image
      source={{ uri: avatar_url }}
      className="w-10 h-10 rounded-full"
    />
  )
}