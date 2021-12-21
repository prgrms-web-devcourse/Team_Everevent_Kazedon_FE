import React, { createContext, useMemo, useReducer } from 'react';
import useUserProvider from './actions';
import { User, UserContextType } from './types';
import { userContextreducer } from './reducer';

const initialState: User = {
  email: '',
  nickname: '',
  userType: { type: '', id: '' },
};

const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userContextreducer, initialState);
  const {
    handleLogIn,
    handleRegister,
    handleLogOut,
    handleUserCheck,
    handleModifyNickname,
  } = useUserProvider(dispatch);

  const value = useMemo(
    () => ({
      state,
      handleLogIn,
      handleRegister,
      handleLogOut,
      handleUserCheck,
      handleModifyNickname,
    }),
    [
      state,
      handleLogIn,
      handleRegister,
      handleLogOut,
      handleUserCheck,
      handleModifyNickname,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
