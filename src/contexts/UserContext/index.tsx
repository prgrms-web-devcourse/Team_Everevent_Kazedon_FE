import React, { createContext, useMemo, useReducer } from 'react';
import useUserProvider from './actions';
import { User, UserContextType } from './types';
import { userContextreducer } from './reducer';

const initialState: User = { email: '', token: '', nickname: '' };

const UserContext = createContext<UserContextType>(initialState);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userContextreducer, initialState);
  const { handleLogIn, handleRegister, handleLogOut } =
    useUserProvider(dispatch);

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

export default UserContext;
