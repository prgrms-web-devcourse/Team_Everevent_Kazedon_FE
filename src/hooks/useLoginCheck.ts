import { onCheckToken } from '@axios/user';
import { UserContext } from '@contexts/userInfo';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

const useLoginCheck = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const { user, handleUserCheck } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsFirst(() => false);
    if (window) {
      setToken(localStorage.getItem('token'));
    }
  }, [token]);

  const handleCheck = useCallback(
    async (isPrivate = true) => {
      if (isLoading) return;

      setIsLoading(true);

      if (user.userId) {
        setIsLoading(false);
        return;
      }

      if (!token) {
        if (!isPrivate) return;
        router.replace('/login');
        return;
      }

      const res = await onCheckToken();

      if (res.error.code) {
        localStorage.removeItem('token');
        if (!isPrivate) router.replace('/login');
      } else {
        await handleUserCheck(res.data);
        setIsLoading(false);
      }
      /* eslint-disable react-hooks/exhaustive-deps */
    },
    [router, user, token, isFirst, handleUserCheck]
  );

  return { isFirst, handleCheck };
};

export default useLoginCheck;
