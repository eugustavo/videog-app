import { useState } from "react";
import { Pressable, Text } from "react-native";

interface DetailsProps {
  videoTitle: string;
  videoDescription: string;
}

export function Details({ videoTitle, videoDescription }: DetailsProps) {
  const [numberOfLines, setNumberOfLines] = useState(2);

  function handleMoreDescription() {
    setNumberOfLines(numberOfLines === 2 ? 99 : 2);
  }

  return (
    <>
      <Text
        className="text-zinc-50 font-bold text-md mb-1"
        numberOfLines={1}
        style={{
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1.8 },
          textShadowRadius: 2
        }}
      >
        {videoTitle}
      </Text>

      <Pressable onPress={handleMoreDescription}>
        <Text
          className="text-zinc-200 text-xs"
          numberOfLines={numberOfLines}
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1.8 },
            textShadowRadius: 2
          }}
        >
          {videoDescription}
        </Text>
      </Pressable>
    </>
  )
}