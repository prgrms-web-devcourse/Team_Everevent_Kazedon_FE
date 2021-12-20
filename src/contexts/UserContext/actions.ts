import {
  HEADERTOKEN,
  LOGIN,
  LOGOUT,
  REGISTER,
  TOKEN,
  USERCHECK,
} from '@utils/constantUser';
import { removeStorage, setStorage } from '@utils/storage';
import { Dispatch, useCallback } from 'react';
import { onLogIn, onRegister, onLogOut, onCheckUser } from '@axios/user';
import { LoginUserInfo, RegisterUserInfo } from './types';

const useUserProvider = (dispatch: Dispatch<any>) => {
  const handleLogIn = useCallback(
    async (userInfo: LoginUserInfo) => {
      const res = await onLogIn(userInfo);

      if (res.error.code) {
        throw new Error('로그인 실패');
      }

      const header = await res.headers;
      const user = await res.data;

      dispatch({ type: LOGIN, user });
      setStorage(TOKEN, header[HEADERTOKEN]);
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (registerUserInfo: RegisterUserInfo) => {
      const res = await onRegister(registerUserInfo);

      if (res.error.code) {
        throw new Error(`회원가입 실패${res.error.code}`);
      }

      dispatch({
        type: REGISTER,
      });
    },
    [dispatch]
  );

  const handleLogOut = useCallback(async () => {
    await onLogOut();
    dispatch({ type: LOGOUT });
    removeStorage(TOKEN);
  }, [dispatch]);

  const handleUserCheck = useCallback(async () => {
    const user = await onCheckUser();

    dispatch({ type: USERCHECK, user });
  }, [dispatch]);

  return {
    handleLogIn,
    handleRegister,
    handleLogOut,
    handleUserCheck,
  };
};

export default useUserProvider;
