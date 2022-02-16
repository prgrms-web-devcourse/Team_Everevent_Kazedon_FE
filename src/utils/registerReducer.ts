import { RegisterUserInfo } from '@contexts/userInfo/types';
import { TEXT, validation } from './constantUser';

interface ErrorRegisterState {
  email: boolean;
  password: boolean;
  passwordCheck: boolean;
  nickname: boolean;
}

interface RegisterAction {
  name: string;
  payload: Partial<RegisterUserInfo>;
}

const registerReducer = (state: ErrorRegisterState, action: RegisterAction) => {
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

export default registerReducer;
