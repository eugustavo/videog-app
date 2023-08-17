import { useRef } from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Video } from '@components/Video';

const feedVideos = [
  {
    id: '1',
    user: {
      name: '@eugustavo',
      imageUri: 'https://github.com/eugustavo.png',
    },
    videoUri: 'https://rrwachssijquieilblet.supabase.co/storage/v1/object/public/videos/IMG_1147.MOV?t=2023-08-17T03%3A48%3A38.935Z',
  },
  {
    id: '2',
    user: {
      name: '@rodrigobratza',
      imageUri: 'https://github.com/eugustavo.png',
    },
    videoUri: 'https://rrwachssijquieilblet.supabase.co/storage/v1/object/public/videos/AE28602B-82E7-41EC-A9D7-8D63662CC6F9.MP4?t=2023-08-17T03%3A40%3A58.359Z',
  },
  {
    id: '3',
    user: {
      name: '@robertoputzanio',
      imageUri: 'https://github.com/eugustavo.png',
    },
    videoUri: 'https://rrwachssijquieilblet.supabase.co/storage/v1/object/public/videos/RPReplay_Final1687528336.MP4',
  }
];

export default function App() {
  return (
    <>
      <StatusBar hidden />

      <View className='flex flex-1 bg-black'>
        <FlatList
          data={feedVideos}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Video data={item} />
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={Dimensions.get('screen').height}
          snapToAlignment='center'
          decelerationRate='fast'
          scrollEventThrottle={60}
          viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 100
          }}
        />
        
      </View>
    </>
  );
}
