import { LOGIN, LOGOUT, REGISTER, text, USERCHECK } from '@utils/constantUser';
import { User, Action, ErrorState, RegisterAction } from './types';

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

    default:
      return state;
  }
};

export const registerReducer = (state: ErrorState, action: RegisterAction) => {
  switch (action.name) {
    case text.email: {
      if (text.emailReg.test(action.value)) return { ...state, email: false };
      return { ...state, email: true };
    }
    case text.password: {
      if (text.passwordReg.test(action.value))
        return { ...state, password: false };
      return { ...state, password: true };
    }
    case text.passwordCheck: {
      if (action.password === action.value)
        return { ...state, passwordCheck: false };
      return { ...state, passwordCheck: true };
    }
    case text.nickname: {
      if (text.nicknameReg.test(action.value))
        return { ...state, nickname: false };
      return { ...state, nickname: true };
    }
    default: {
      return state;
    }
  }
};
