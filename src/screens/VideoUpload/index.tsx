import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { Check } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";
import { useSendVideo } from "@hooks/video/useSendVideo";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function VideoUpload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [videoEXT, setVideoEXT] = useState('');
  const [videoURI, setVideoURI] = useState('');
  const [video, setVideo] = useState<FormData>();

  const { user } = useAuth()
  const { mutateAsync } = useSendVideo({ video })
  const { reset } = useNavigation<AppNavigatorRoutesProps>();

  async function handleSelectVideo() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.1,
      videoMaxDuration: 10,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const ext = result.assets[0].uri.split('.').pop();

      uri && setVideoURI(uri);
      ext && setVideoEXT(ext);

      return
    }

    setVideoURI('');
  }

  async function handleSendVideo() {
    if (!videoURI || !videoEXT || !title || !description) return

    setIsLoading(true);

    const videoFormData = new FormData();
    
    videoFormData.append('title', title);
    videoFormData.append('description', description);
    videoFormData.append('author_id', user.id);
    videoFormData.append('video', { uri: videoURI, name: `video.${videoEXT}`, type: `video/mp4`}, '');

    setVideo(videoFormData);
    await mutateAsync({ mutationKey: ['sendVideo', { video: videoFormData }] });

    setTimeout(() => {
      setIsLoading(false);
      reset({
        index: 0,
        routes: [{ name: 'Feed' }]
      })
    }, 1000)    
  }

  return (
    <SafeAreaView className="flex flex-1 bg-black items-center">
      <Text className="text-zinc-50 font-bold text-lg mt-2">Envie seu vídeo</Text>

      <View className="w-full px-4">
        <TextInput
          placeholder="Titulo do vídeo"
          placeholderTextColor="#9CA3AF"
          className="border border-zinc-200 text-zinc-50 rounded-md h-10 mt-10 px-4"
          autoCapitalize="none"
          autoCorrect={false}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          placeholder="Descrição do vídeo"
          placeholderTextColor="#9CA3AF"
          className="border border-zinc-200 text-zinc-50 rounded-md h-20 mt-4 px-4 py-2"
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity 
          className="flex items-center justify-center h-10 mt-6 border border-zinc-200 rounded-md"
          onPress={handleSelectVideo}
        >
          {videoURI ? (
            <View className="flex-row items-center">
              <Text className="text-zinc-50 font-bold">
                Video selecionado
              </Text>

              <Check className="ml-2 text-emerald-500" size={20} />
            </View>
          ):(
            <Text className="text-zinc-50 font-bold">Escolher vídeo</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="flex flex-1 w-full items-center justify-end px-4 mb-2">
        <TouchableOpacity
          className="flex items-center w-full justify-center h-10 mt-6 border border-zinc-200 rounded-md"
          onPress={handleSendVideo}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text className="text-zinc-50 font-bold">Enviando...</Text>
          ):(
            <Text className="text-zinc-50 font-bold">Enviar vídeo</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}