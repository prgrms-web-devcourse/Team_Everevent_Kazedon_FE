import {
  LOGIN,
  LOGOUT,
  MODIFYNICKNAME,
  REGISTER,
  TEXT,
  USERCHECK,
  validation,
} from '@utils/constantUser';
import { User, Action, RegisterAction, ErrorRegisterState } from './types';

export const userContextreducer = (state: User, action: Action): User => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.user.email,
        nickname: action.user.nickname,
        userType: action.user.userType,
      };
    case REGISTER:
      return { ...state };
    case LOGOUT:
      return {
        ...state,
        email: '',
        nickname: '',
        userType: { type: '', id: '' },
      };
    case USERCHECK:
      return {
        ...state,
        email: action.user.email,
        nickname: action.user.nickname,
        userType: action.user.userType,
      };
    case MODIFYNICKNAME:
      return { ...state, nickname: action.nickname };
    default:
      return state;
  }
};

export const registerReducer = (
  state: ErrorRegisterState,
  action: RegisterAction
) => {
  switch (action.name) {
    case TEXT.EMAIL: {
      if (validation.email.test(action.payload.email as string))
        return { ...state, email: false };
      return { ...state, email: true };
    }
    case TEXT.PASSWORD: {
      if (validation.password.test(action.payload.password as string))
        return { ...state, password: false };
      return { ...state, password: true };
    }
    case TEXT.PASSWORDCHECK: {
      if (action.payload.password === action.payload.passwordCheck)
        return { ...state, passwordCheck: false };
      return { ...state, passwordCheck: true };
    }
    case TEXT.NICKNAME: {
      if (validation.nickname.test(action.payload.nickname as string))
        return { ...state, nickname: false };
      return { ...state, nickname: true };
    }
    default: {
      return state;
    }
  }
};
