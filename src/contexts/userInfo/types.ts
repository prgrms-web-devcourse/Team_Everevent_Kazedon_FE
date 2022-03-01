import {
  LOADING,
  LOGIN,
  LOGOUT,
  MODIFYNICKNAME,
  REGISTER,
  USERCHECK,
} from '@utils/constantUser';

export interface User {
  email: string;
  nickname: string;
  userId: string;
  marketId?: string;
}

export interface UserInfo {
  isLoading: boolean;
  user: User;
}

type ActionType =
  | typeof LOADING
  | typeof LOGIN
  | typeof REGISTER
  | typeof MODIFYNICKNAME
  | typeof USERCHECK
  | typeof LOGOUT;

export type UserAction = {
  type: ActionType;
  payload?: any;
};

export interface UserContextType extends UserInfo {
  [dispatchEvent: string]: any;
}

export interface BaseAuthInfo {
  email: string;
  password: string;
}

export interface RegisterUserInfo extends BaseAuthInfo {
  passwordCheck: string;
  nickname: string;
}

export interface ProfileUserInfo extends Omit<RegisterUserInfo, 'email'> {
  passwordConfirm: string;
}
