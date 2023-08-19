'use client';
import { useQuery } from '@tanstack/react-query';
import { env } from './server/env';

export default function useSession() {
  const {
    data: session,
    isLoading: loadingSession,
    isError: sessionFailed,
  } = useQuery({
    queryKey: ['session'],
    queryFn: () =>
      fetch('/api/auth/me', {
        headers: new Headers({ 'content-type': 'application/json' }),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return {
    session,
    loadingSession,
    sessionFailed,
  };
}
