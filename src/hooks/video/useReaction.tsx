import { useMutation, QueryFunctionContext } from "@tanstack/react-query";

import { api } from "@services/api";

interface UseReactionProps {
  user_id: string;
  video_id: string;
}

export async function videoReaction({ mutationKey }: any): Promise<void> {
  const [_, { user_id, video_id }] = mutationKey;

  await api.post('/video/reaction', {
    user_id,
    video_id,
  });
}

export function useReaction({ user_id, video_id }: UseReactionProps) {
  return useMutation({
    mutationKey: ['videoReaction', { user_id, video_id }],
    mutationFn: videoReaction,
  });
}