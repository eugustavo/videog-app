import { useRef, useState } from "react";
import { Dimensions, Pressable, View } from "react-native";
import { Video as VideoPlayer, ResizeMode } from "expo-av";

import { FeedDTO } from "@dtos/FeedDTO";

import { Author } from "./Author";
import { Details } from "./Details";
import { Actions } from "./Actions";

interface VideoProps {
  data: FeedDTO
}

const { height: heightScreen, width: widthScreen } = Dimensions.get('screen');
const BOTTOM_BAR_AND_STATUS_BAR_HEIGHT = 160;

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
      <View className="flex flex-col absolute px-4 bottom-[10px] z-10">
        <Author userId={data.authorid} userName={data.authorname} userAvatar={data.authoravatar} />
        <Details videoTitle={data.title} videoDescription={data.description} />
      </View>

      <View className="flex flex-col absolute right-5 bottom-[60px] z-10">
        <Actions videoId={data.id} videoUrl={data.video_url} />
      </View>

      <VideoPlayer
        ref={videoRef}
        source={{
          uri: data.video_url
        }}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={false}
        isMuted={false}
        onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
        onLoad={() => {}}
        style={{
          width: widthScreen,
          height: heightScreen - BOTTOM_BAR_AND_STATUS_BAR_HEIGHT,
        }}
      />
    </Pressable>
  )
}