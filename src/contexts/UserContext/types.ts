export interface User {
  id: string;
  token: string;
}

export interface LoginUserInfo {
  id: string;
  password: string;
}

export interface RegisterUserInfo extends LoginUserInfo {
  nickname: string;
}

export type Action =
  | { type: 'LOG_IN'; user: User }
  | { type: 'REGISTER' }
  | { type: 'LOG_OUT' };

export interface UserContextType {
  [dispatchEvent: string]: any;
}
