import { useMutation } from "@tanstack/react-query";

import { api } from "@services/api";

interface UseCreateUserProps {
  name: string;
  avatar_url: string;
  user_identifier: string;
}

export async function createUser({ mutationKey }: any): Promise<string> {
  const [_, { name, avatar_url, user_identifier }] = mutationKey;

  const { data } = await api.post('/users', {
    name: name,
    avatar_url: avatar_url ,
    user_identifier
  });

  return data.id
}

export function useCreateUser({ name, avatar_url, user_identifier }: UseCreateUserProps) {
  return useMutation({
    mutationKey: ['createUser', { name, avatar_url, user_identifier }],
    mutationFn: createUser,
  });
}