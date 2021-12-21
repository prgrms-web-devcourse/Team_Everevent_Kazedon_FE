export interface UserType {
  type: string;
  id: string;
}
export interface Info {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  passwordConfirm: string;
  userType: UserType;
  userId: string;
}

export interface ErrorRegisterState {
  email: boolean;
  password: boolean;
  passwordCheck: boolean;
  nickname: boolean;
}

export type User = Partial<
  Pick<Info, 'email' | 'nickname' | 'userId' | 'userType'>
>;
export type LoginUserInfo = Pick<Info, 'email' | 'password'>;
export type RegisterUserInfo = Omit<
  Info,
  'passwordConfirm' | 'userType' | 'userId'
>;
export type OverlapParams = Pick<Info, 'email' | 'nickname'>;

export type ProfileUserInfo = Partial<
  Omit<Info, 'email' | 'userId' | 'userType'>
>;
export type ErrorProfile = Partial<Omit<Info, 'email' | 'userId' | 'userType'>>;

export type Action =
  | { type: 'LOG_IN'; user: User }
  | { type: 'REGISTER' }
  | { type: 'LOG_OUT' }
  | { type: 'USER_CHECK'; user: User };

export interface UserContextType {
  [dispatchEvent: string]: any;
}

export interface RegisterAction {
  name: string;
  payload: Partial<RegisterUserInfo>;
}

export interface OverlapCheckInfo {
  type: string;
  value?: string;
}
