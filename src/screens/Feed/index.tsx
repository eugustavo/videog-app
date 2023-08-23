import { useEffect, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";

import { Video } from "@components/Video";
import { useFeed } from "@hooks/video/useFeed";
import { useAuth } from "@hooks/useAuth";
import { FeedDTO } from "@dtos/FeedDTO";

const fullScreenHeight = Dimensions.get('screen').height;

export function Feed() {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState<FeedDTO[]>([]);

  const { user } = useAuth();
  const { data, isFetched, refetch } = useFeed({
    user_id: user.id,
    page,
  });

  function handleLoadMore() {
    setPage(page + 1);
    refetch()
  }

  useEffect(() => {
    if (isFetched && data) {
      let feedVideos:FeedDTO[] = videos;

      data.forEach((video) => {
        feedVideos.push(video)
      })

      setVideos(feedVideos)
    }
  }, [isFetched])

  return (
    <View className='flex flex-1 items-center justify-center'>
      <FlatList
        data={videos}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Video data={item} />
        )}
        showsVerticalScrollIndicator={false}
        snapToInterval={fullScreenHeight - 160}
        snapToAlignment='center'
        decelerationRate='fast'
        className="bg-black mt-16"
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
      />
    </View>
  )
}