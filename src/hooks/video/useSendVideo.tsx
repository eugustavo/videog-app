import { useMutation } from "@tanstack/react-query";

import { api } from "@services/api";

interface UseSendVideoProps {
  video: FormData | undefined;
}

export async function sendVideo({ mutationKey }: any): Promise<void> {
  const [_, { video }] = mutationKey;

  await api.post('/videos', video, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function useSendVideo({ video }: UseSendVideoProps) {
  return useMutation({
    mutationKey: ['sendVideo', { video }],
    mutationFn: sendVideo,
  });
}