import { Image, Text, TouchableOpacity } from "react-native";

import googleLogo from "@assets/logo-google.png";
import appleLogo from "@assets/logo-apple.png";

interface SignInButtonProps {
  action: () => void;
  provider: 'google' | 'apple';
  isLoading?: boolean;
}

export function SignInButton({ action, provider, isLoading }: SignInButtonProps) {
  const logo = provider === 'google' ? googleLogo : appleLogo;
  const text = provider === 'google' ? 'Entrar com Google' : 'Entrar com Apple';

  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-center bg-white rounded-sm px-8 py-4 mb-2"
      onPress={action}
    >
      <Image
        source={logo}
        style={{ width: 24, height: 24 }}
      />

      <Text className="text-black font-medium ml-2">
        {isLoading ? 'Acessando...' : text}
      </Text>
    </TouchableOpacity>
  )
}