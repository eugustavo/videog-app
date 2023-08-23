import { useQuery } from "@tanstack/react-query";

import { ProfileDTO } from "@dtos/ProfileDTO";
import { api } from "@services/api";

interface UseProfileProps {
  user_id?: string;
  follow_user_id?: string;
}

export async function getProfile({ queryKey }: any): Promise<ProfileDTO> {
  const [_, { user_id, follow_user_id }] = queryKey;

  const url = follow_user_id ? `/profiles/${user_id}/${follow_user_id}` : `/profiles/${user_id}`;

  const { data } = await api.get<ProfileDTO>(url);

  return data;
}

export function useProfile({ user_id, follow_user_id }: UseProfileProps) {
  return useQuery({
    queryKey: ['profile', { user_id, follow_user_id }],
    queryFn: getProfile,
    staleTime: 1000 * 30, // 30 seconds
  });
}