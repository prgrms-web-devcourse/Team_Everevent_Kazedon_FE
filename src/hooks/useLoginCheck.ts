import { onCheckToken } from '@axios/user';
import UserContext from '@contexts/UserContext';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

const useLoginCheck = () => {
  const [isFirst, setIsFirst] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const { state, handleUserCheck } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    setIsFirst(() => false);
    if (window) {
      setToken(localStorage.getItem('token'));
    }
  }, [token]);

  const handleCheck = useCallback(async () => {
    if (!token) {
      router.replace('/login');
      return;
    }

    const res = await onCheckToken();

    if (res.error.code) {
      localStorage.removeItem('token');
      router.replace('/login');
    } else if (!state.email && !state.nickname) {
      await handleUserCheck();
    }
  }, [router, state, token, handleUserCheck]);

  return { isFirst, handleCheck };
};

export default useLoginCheck;
