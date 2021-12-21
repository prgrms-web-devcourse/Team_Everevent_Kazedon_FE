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
import {
  onLogIn,
  onRegister,
  onLogOut,
  onCheckUser,
  onGetUserType,
} from '@axios/user';
import { LoginUserInfo, RegisterUserInfo, User } from './types';

const useUserProvider = (dispatch: Dispatch<any>) => {
  const handleLogIn = useCallback(
    async (userInfo: LoginUserInfo) => {
      const res = await onLogIn(userInfo);

      if (res.error.code) {
        throw new Error('로그인 실패');
      }

      const header = await res.headers;
      const user = await res.data;

      setStorage(TOKEN, header[HEADERTOKEN]);

      const userTypeRes = await onGetUserType();
      const resUser: User = {
        email: user.email,
        nickname: user.nickname,
      };

      if (userTypeRes.error.code) {
        resUser.userType = {
          type: 'user',
          id: user.userId as string,
        };
      } else {
        resUser.userType = {
          type: 'owner',
          id: userTypeRes.data.marketId,
        };
      }

      dispatch({ type: LOGIN, user: resUser });
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
    const res = await onCheckUser();
    const user = await res.data;
    const userTypeRes = await onGetUserType();
    const resUser: User = {
      email: user.email,
      nickname: user.nickname,
    };

    if (userTypeRes.error.code) {
      resUser.userType = {
        type: 'user',
        id: user.userId as string,
      };
    } else {
      resUser.userType = {
        type: 'owner',
        id: userTypeRes.data.marketId,
      };
    }

    dispatch({ type: USERCHECK, user: resUser });
  }, [dispatch]);

  return {
    handleLogIn,
    handleRegister,
    handleLogOut,
    handleUserCheck,
  };
};

export default useUserProvider;
