import { useMutation } from "@tanstack/react-query";

import { api } from "@services/api";

interface UseSendCommentProps {
  author_id: string;
  video_id: string;
  content: string;
}

export async function sendComment({ mutationKey }: any): Promise<void> {
  const [_, { author_id, video_id, content }] = mutationKey;

  await api.post('/public/comments', {
    author_id,
    video_id,
    content,
  });
}

export function useSendComment({ author_id, video_id, content }: UseSendCommentProps) {
  return useMutation({
    mutationKey: ['sendComment', { author_id, video_id, content }],
    mutationFn: sendComment,
  });
}