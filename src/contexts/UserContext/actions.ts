import {
  HEADERTOKEN,
  LOGIN,
  LOGOUT,
  MODIFYNICKNAME,
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
import { LoginUserInfo, User } from './types';

const useUserProvider = (dispatch: Dispatch<any>) => {
  const handleLogIn = useCallback(
    async (userInfo: LoginUserInfo) => {
      const res = await onLogIn(userInfo);

      if (res.error.code) return res;

      const header = res.headers;
      const user = res.data;

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

      return res;
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (registerUserInfo) => {
      const res = await onRegister(registerUserInfo);

      dispatch({
        type: REGISTER,
      });

      return res;
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

  const handleModifyNickname = useCallback(
    (nickname) => {
      dispatch({ type: MODIFYNICKNAME, nickname });
    },
    [dispatch]
  );

  return {
    handleLogIn,
    handleRegister,
    handleLogOut,
    handleUserCheck,
    handleModifyNickname,
  };
};

export default useUserProvider;
