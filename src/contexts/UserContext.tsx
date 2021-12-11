import React, { createContext, useCallback, useMemo, useReducer } from 'react';

interface User {
  id: string;
  token: string;
}

interface LoginUserInfo {
  id: string;
  password: string;
}

interface RegisterUserInfo extends LoginUserInfo {
  nickname: string;
}

type Action =
  | { type: 'LOG_IN'; user: User }
  | { type: 'REGISTER' }
  | { type: 'LOG_OUT' };

const initialState: User = { id: '', token: '' };

interface UserContextType {
  [dispatchEvent: string]: any;
}

export const UserContext = createContext<UserContextType>(initialState);

function reducer(state: User, action: Action): User {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, id: action.user.id, token: action.user.token };
    case 'REGISTER':
      return { ...state };
    case 'LOG_OUT':
      return { ...state, id: '', token: '' };
    default:
      return state;
  }
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogIn = useCallback((userInfo: LoginUserInfo) => {
    // 로그인 API통신 body: values
    // 통신 이후 mock 데이터

    const currentUser: User = { id: 'seonjae', token: 'fdsafwe123' };

    dispatch({
      type: 'LOG_IN',
      user: currentUser,
    });
  }, []);

  const handleRegister = useCallback((registerUserInfo: RegisterUserInfo) => {
    // 로그인 API통신 body: values
    // 통신 이후 mock 데이터

    dispatch({
      type: 'REGISTER',
    });
  }, []);

  const handleLogOut = useCallback(() => {
    dispatch({ type: 'LOG_OUT' });
  }, []);

  const value = useMemo(
    () => ({
      state,
      handleLogIn,
      handleRegister,
      handleLogOut,
    }),
    [state, handleLogIn, handleRegister, handleLogOut]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
