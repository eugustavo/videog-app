import { useMutation } from "@tanstack/react-query";

import { api } from "@services/api";

interface UseFollowProps {
  user_id: string;
  follow_user_id?: string;
}

export async function follow({ mutationKey }: any): Promise<void> {
  const [_, { user_id, follow_user_id }] = mutationKey;

  await api.post('/profiles/action', {
    user_id,
    follow_user_id
  });
}

export function useFollow({ user_id, follow_user_id }: UseFollowProps) {
  return useMutation({
    mutationKey: ['follow', { user_id, follow_user_id }],
    mutationFn: follow,
  });
}