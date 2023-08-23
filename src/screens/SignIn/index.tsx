import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import * as AppleAuthentication from 'expo-apple-authentication';
import { faker } from '@faker-js/faker';
import { randomUUID } from "expo-crypto";

import { useAuth } from "@hooks/useAuth";
import { SignInButton } from "@components/SignInButton";
import { Logo } from "@components/Logo";

import backgroungImg from "@assets/sign-in-bg.png";
import { useCreateUser } from "@hooks/user/useCreateUser";
import { useGetUser } from "@hooks/user/useGetUser";

export function SignIn() {
  const [userIdentifier, setUserIdentifier] = useState<string | null>(null);

  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingApple, setIsLoadingApple] = useState(false);

  const { signIn } = useAuth();

  const { mutateAsync } = useCreateUser({
    name: '',
    avatar_url: '',
    user_identifier: '',
  })
  const { data, refetch } = useGetUser({
    user_identifier: userIdentifier,
  })

  async function handleSignInWithGoogle() {
    setIsLoadingGoogle(true);

    const name = faker.person.fullName()
    const avatar_url = faker.internet.avatar()
    const user_identifier = randomUUID()

    const userId = await mutateAsync({
      mutationKey: ['createUser', {
        name,
        avatar_url,
        user_identifier,
      }]
    })

    await signIn({
      userIdentifier: userId,
    })

    setIsLoadingGoogle(false);
  }

  async function handleSignInWithApple() {
    setIsLoadingApple(true);
    try {
      const { fullName, user } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      })
  
      setUserIdentifier(user)
      await refetch();
  
      if (data) {
        signIn({
          userIdentifier: data.id,
        })
  
        setIsLoadingApple(false);
        return;
      }
  
      const appleUserName = `${fullName?.givenName} ${fullName?.middleName}`
      const name = appleUserName || faker.person.fullName()
      const avatar_url = faker.internet.avatar()
      const user_identifier = randomUUID()
  
      const userId = await mutateAsync({
        mutationKey: ['createUser', {
          name,
          avatar_url,
          user_identifier,
        }]
      })
  
      await signIn({
        userIdentifier: userId,
      })
      setIsLoadingApple(false);
  
      return;
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingApple(false);
    }
  }

  return (
    <View className="flex flex-1 bg-black pb-20">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Image 
          className="absolute top-0"
          source={backgroungImg}
        />

        <View className="flex flex-1 flex-col items-center justify-center">
          <Logo />
          
          <Text className="text-zinc-200">
            Seu aplicativo de vídeos favorito
          </Text>
        </View>


        <View className="flex flex-col w-full px-8 mb-24">
          <SignInButton 
            action={handleSignInWithGoogle}
            provider="google"
            isLoading={isLoadingGoogle}
          />

          <SignInButton 
            action={handleSignInWithApple}
            provider="apple"
            isLoading={isLoadingApple}
          />
        </View>
      </ScrollView>
    </View>
  )
}