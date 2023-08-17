import { useRef, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { Video as VideoPlayer, ResizeMode, AVPlaybackStatus } from "expo-av";

interface VideoProps {
  data: {
    id: string;
    user: {
      name: string;
      imageUri: string;
    };
    videoUri: string;
  }
}

const { height: heightScreen, width: widthScreen } = Dimensions.get('screen');

export function Video({ data }: VideoProps) {
  const [videoStatus, setVideoStatus] = useState({} as any);
  const videoRef = useRef<VideoPlayer>(null);

  function togglePlay() {
    if (videoStatus?.isPlaying) {
      return videoRef.current?.pauseAsync();
    } 
    
    videoRef.current?.playAsync();
  }


  return (
    <Pressable onPress={togglePlay}>
      <View className="flex flex-col absolute px-4 bottom-10 z-10">
        <Text
          className="text-zinc-50 font-bold text-lg mb-1"
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1.8 },
            textShadowRadius: 2
          }}
        >
          {data.user.name}
        </Text>

        <Text
          className="text-zinc-200" numberOfLines={2}
          style={{
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1.8 },
            textShadowRadius: 2
          }}
        >
          Video gravado em um dia qualquer por ai, video gravado em um dia qualquer por ai, video gravado em um dia qualquer por ai, 
        </Text>
      </View>

      <VideoPlayer
        ref={videoRef}
        style={{ width: widthScreen, height: heightScreen }}
        source={{
          uri: data.videoUri
        }}
        isLooping
        resizeMode={ResizeMode.COVER}
        shouldPlay={false}
        isMuted={false}
        onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
      />
    </Pressable>
  )
}