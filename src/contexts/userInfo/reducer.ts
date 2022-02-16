import {
  LOADING,
  LOGIN,
  MODIFYNICKNAME,
  REGISTER,
  USERCHECK,
} from '@utils/constantUser';
import { Reducer } from 'react';
import { UserAction, UserInfo } from './types';

export const reducer: Reducer<UserInfo, UserAction> = (
  prevState,
  { type, payload }
) => {
  switch (type) {
    case LOADING: {
      return {
        ...prevState,
        isLoading: !prevState.isLoading,
      };
    }
    case LOGIN: {
      return {
        ...prevState,
        user: payload,
      };
    }
    case REGISTER: {
      return { ...prevState };
    }
    case MODIFYNICKNAME: {
      return { ...prevState, user: { ...prevState.user, nickname: payload } };
    }
    case USERCHECK: {
      return { ...prevState, user: payload };
    }
    default: {
      return prevState;
    }
  }
};
