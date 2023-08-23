import { useQuery } from "@tanstack/react-query";

import { CommentDTO } from "@dtos/CommentDTO";
import { api } from "@services/api";

interface UseCommentsProps {
  video_id: string;
}

export async function getComments({ queryKey }: any): Promise<CommentDTO[]> {
  const [_, { video_id }] = queryKey;
  const { data } = await api.get<CommentDTO[]>(`/comments/${video_id}`);

  return data;
}

export function useComment({ video_id }: UseCommentsProps) {
  return useQuery({
    queryKey: ['comments', { video_id }],
    queryFn: getComments,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
}