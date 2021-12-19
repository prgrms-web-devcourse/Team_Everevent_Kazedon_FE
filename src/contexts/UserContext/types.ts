export interface Info {
  email: string;
  password: string;
  passwordCheck: string;
  passwordConfirm: string;
  nickname: string;
  token: string;
}

export type User = Partial<Pick<Info, 'email' | 'token' | 'nickname'>>;
export type LoginUserInfo = Required<Pick<Info, 'email' | 'password'>>;
export type RegisterUserFormData = Required<
  Omit<Info, 'token' | 'passwordConfirm'>
>;
export type RegisterUserInfo = Required<
  Omit<Info, 'passwordCheck' | 'token' | 'passwordConfirm'>
>;
export type ErrorUserForm = Partial<Omit<Info, 'token' | 'passwordConfirm'>>;
export type ProfileUserInfo = Partial<Omit<Info, 'email' | 'token'>>;
export type ErrorProfile = Partial<Omit<Info, 'email' | 'token'>>;

export type Action =
  | { type: 'LOG_IN'; user: User }
  | { type: 'REGISTER' }
  | { type: 'LOG_OUT' };

export interface UserContextType {
  [dispatchEvent: string]: any;
}

export interface ErrorState {
  email: boolean;
  password: boolean;
  passwordCheck: boolean;
  nickname: boolean;
}
export interface RegisterAction {
  name: string;
  value: string;
  password?: string;
}

export interface OverlapCheckInfo {
  type: string;
  value?: string;
}
