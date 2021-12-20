import request from '@axios/index';
import { ResType } from '@axios/types';
import {
  LoginUserInfo,
  OverlapCheckInfo,
  RegisterUserInfo,
  User,
} from '@contexts/UserContext/types';

export const onLogOut = async () => {
  const res: ResType<any> = await request.get('logout');

  return res;
};

export const onRegisterCheck = async (check: OverlapCheckInfo) => {
  const res: ResType<any> = await request.get(
    `signup/check?type=${check.type}&value=${check.value}`
  );

  return res;
};

export const onLogIn = async (userInfo: LoginUserInfo) => {
  const res: ResType<User> = await request.post('login', userInfo);

  return res;
};

export const onRegister = async (registerUserInfo: RegisterUserInfo) => {
  const res: ResType<any> = await request.post('signup', registerUserInfo);

  return res;
};

export const onConfirmPassword = async (password: 'passwordConfirm') => {
  const res: ResType<any> = await request.post('members/check/password', {
    password,
  });

  return res;
};

export const onCheckToken = async () => {
  const res: ResType<any> = await request.get('members/check/token');

  return res;
};

export const onCheckUser = async () => {
  const res: ResType<any> = await request.get('members');

  return res;
};
