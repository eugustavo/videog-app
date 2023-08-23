import { useQuery } from "@tanstack/react-query";

import { api } from "@services/api";

interface UseHasLikedProps {
  user_id: string;
  video_id: string;
}

export async function hasLiked({ queryKey }: any): Promise<boolean> {
  const [_, { user_id, video_id }] = queryKey;
  const { data } = await api.get<boolean>(`/hasliked/${user_id}/${video_id}`);

  return data;
}

export function useHasLiked({ user_id, video_id }: UseHasLikedProps) {
  return useQuery({
    queryKey: ['hasLiked', { user_id, video_id }],
    queryFn: hasLiked,
    staleTime: 1000 * 5, // 5 seconds
  });
}