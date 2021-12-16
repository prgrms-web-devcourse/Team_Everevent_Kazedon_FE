import React, { createContext, useMemo, useReducer } from 'react';
import useOwnerProvider from './actions';
import { ChangeOwnerInfo, OwnerContextType } from './types';
import { ownerContextreducer } from './reducer';

const initialState: ChangeOwnerInfo = {
  name: '',
  description: '',
  location: '',
};

export const OwnerContext = createContext<OwnerContextType>(initialState);

export const OwnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(ownerContextreducer, initialState);
  const { handleChangeOwner } = useOwnerProvider(dispatch);

  const value = useMemo(
    () => ({
      state,
      handleChangeOwner,
    }),
    [state, handleChangeOwner]
  );

  return (
    <OwnerContext.Provider value={value}>{children}</OwnerContext.Provider>
  );
};
