import { useQuery } from "@tanstack/react-query";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

interface UseGetUserProps {
  user_identifier: string | null
}

export async function getUser({ queryKey }: any): Promise<UserDTO | null> {
  const [_, { user_identifier }] = queryKey;

  if (!user_identifier) return null;

  const { data } = await api.get<UserDTO | null>(`/users/${user_identifier}`);
  return data;
}

export function useGetUser({ user_identifier }: UseGetUserProps) {
  return useQuery({
    queryKey: ['getUser', { user_identifier }],
    queryFn: getUser,
  });
}