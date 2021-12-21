export interface UserType {
  type: string;
  id: string;
}
export interface Info {
  email: string;
  userType: UserType;
  userId: string;
  password: string;
  passwordCheck: string;
  passwordConfirm: string;
  nickname: string;
}

export type User = Partial<
  Pick<Info, 'email' | 'nickname' | 'userId' | 'userType'>
>;
export type LoginUserInfo = Required<Pick<Info, 'email' | 'password'>>;
export type RegisterUserFormData = Required<
  Omit<Info, 'passwordConfirm' | 'userId' | 'userType'>
>;
export type RegisterUserInfo = Required<
  Omit<Info, 'passwordCheck' | 'passwordConfirm' | 'userId' | 'userType'>
>;
export type ErrorUserForm = Partial<
  Omit<Info, 'passwordConfirm' | 'userId' | 'userType'>
>;
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
