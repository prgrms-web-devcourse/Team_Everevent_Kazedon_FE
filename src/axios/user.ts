import request from '@axios/index';
import { ResType } from '@axios/types';
import { BaseAuthInfo, RegisterUserInfo, User } from '@contexts/userInfo/types';

interface RegisterCheckType {
  type: 'nickname' | 'email';
  value: string;
}

export const onLogOut = async () => {
  const res: ResType<any> = await request.post('logout');

  return res;
};

export const onRegisterCheck = async (check: RegisterCheckType) => {
  const res: ResType<any> = await request.get(
    `signup/check?type=${check.type}&value=${check.value}`
  );

  return res;
};

export const onLogIn = async (userInfo: BaseAuthInfo) => {
  const res: ResType<User> = await request.post('login', userInfo);

  return res;
};

export const onRegister = async (
  registerUserInfo: Omit<RegisterUserInfo, 'passwordCheck'>
) => {
  const res: ResType<any> = await request.post('/signup', registerUserInfo);

  return res;
};

export const onConfirmPassword = async (password: 'passwordConfirm') => {
  const res: ResType<any> = await request.post('/members/check/password', {
    password,
  });

  return res;
};

export const onCheckToken = async () => {
  const res: ResType<any> = await request.get('/members/check/token');

  return res;
};

export const onCheckUser = async () => {
  const res: ResType<User> = await request.get('/members');

  return res;
};

export const getMarketId = async () => {
  const res: ResType<any> = await request.get('/markets');

  return res;
};

export const onEditProfile = async (edtionInfo: Partial<RegisterUserInfo>) => {
  const res: ResType<any> = await request.put('/members', edtionInfo);

  return res;
};
