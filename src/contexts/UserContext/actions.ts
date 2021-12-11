import { Dispatch, useCallback } from 'react';
import { LoginUserInfo, RegisterUserInfo, User } from './types';

const useUserProvider = (dispatch: Dispatch<any>) => {
  const handleLogIn = useCallback(
    (userInfo: LoginUserInfo) => {
      // 로그인 API통신 body: values
      // 통신 이후 mock 데이터

      const currentUser: User = { id: 'seonjae', token: 'fdsafwe123' };

      dispatch({
        type: 'LOG_IN',
        user: currentUser,
      });
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    (registerUserInfo: RegisterUserInfo) => {
      // 로그인 API통신 body: values
      // 통신 이후 mock 데이터

      dispatch({
        type: 'REGISTER',
      });
    },
    [dispatch]
  );

  const handleLogOut = useCallback(() => {
    dispatch({ type: 'LOG_OUT' });
  }, [dispatch]);

  return {
    handleLogIn,
    handleRegister,
    handleLogOut,
  };
};

export default useUserProvider;
