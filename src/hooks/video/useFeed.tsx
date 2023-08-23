import { useQuery } from "@tanstack/react-query";

import { FeedDTO } from "@dtos/FeedDTO";
import { api } from "@services/api";

interface UseFeedProps {
  user_id: string;
  page: number;
}

export async function getFeed({ queryKey }: any): Promise<FeedDTO[]> {
  let feedVideos:FeedDTO[] = [];

  const [_, { user_id, page }] = queryKey;
  const { data } = await api.get<FeedDTO[]>(`/feed?user_id=${user_id}&page=${page}`);

  data.forEach((video) => {
    feedVideos.push(video)
  });

  return feedVideos;
}

export function useFeed({ user_id, page }: UseFeedProps) {
  return useQuery({
    queryKey: ['feed', { user_id, page }],
    queryFn: getFeed,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
}