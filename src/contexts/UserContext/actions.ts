import {
  HEADERTOKEN,
  LOGIN,
  LOGOUT,
  REGISTER,
  TOKEN,
} from '@utils/constantUser';
import { removeStorage, setStorage } from '@utils/storage';
import { Dispatch, useCallback } from 'react';
import { onLogIn, onRegister, onLogOut } from '@axios/user';
import { LoginUserInfo, RegisterUserInfo } from './types';

const useUserProvider = (dispatch: Dispatch<any>) => {
  const handleLogIn = useCallback(
    async (userInfo: LoginUserInfo) => {
      const res = await onLogIn(userInfo);

      const header = await res.headers;
      const { email, nickname } = await res.data;

      dispatch({
        type: LOGIN,
        user: { email, nickname, token: header[HEADERTOKEN] },
      });
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

  return {
    handleLogIn,
    handleRegister,
    handleLogOut,
  };
};

export default useUserProvider;
