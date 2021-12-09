import React, { createContext, Dispatch, useReducer } from 'react';

interface User {
  id: string;
  token: string;
}

type Action =
  | { type: 'LOG_IN'; user: User }
  | { type: 'REGISTER' }
  | { type: 'LOG_OUT'; user: User };

type DispatchType = Dispatch<Action>;

const initialState: User = { id: '', token: '' };

export const UserContext = createContext<User>(initialState);
export const UserDispatchContext = createContext<DispatchType>(() => null);

function reducer(state: User, action: Action): User {
  switch (action.type) {
    case 'LOG_IN':
      return { id: action.user.id, token: action.user.token };
    case 'REGISTER':
      return { ...state };
    case 'LOG_OUT':
      return { id: '', token: '' };
    default:
      return state;
  }
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
