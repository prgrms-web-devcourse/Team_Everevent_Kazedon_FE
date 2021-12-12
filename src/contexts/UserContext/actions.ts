import onLogIn from '@axios/user/login';
import onRegister from '@axios/user/register';
import { LOGIN, LOGOUT, REGISTER, TOKEN } from '@utils/constantUser';
import { removeStorage, setStorage } from '@utils/storage';
import { Dispatch, useCallback } from 'react';
import { LoginUserInfo, RegisterUserInfo } from './types';

const useUserProvider = (dispatch: Dispatch<any>) => {
  const handleLogIn = useCallback(
    async (userInfo: LoginUserInfo) => {
      const res = await onLogIn(userInfo);

      if (res.error.code) {
        throw new Error(`로그인 실패${res.error.code}`);
      }
      // header에서 토큰이 어떻게 돌아오는지 확인해야됨
      const xToken = 'x-auth-token';
      const header = await res.headers;
      const { id } = await res.data;

      dispatch({
        type: LOGIN,
        user: { id, token: header[xToken] },
      });
      setStorage(TOKEN, header[xToken]);
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

  const handleLogOut = useCallback(() => {
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
