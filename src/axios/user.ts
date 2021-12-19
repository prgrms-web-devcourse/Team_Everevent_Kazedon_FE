import request from '@axios/index';
import { ResType } from '@axios/types';
import {
  LoginUserInfo,
  OverlapCheckInfo,
  RegisterUserInfo,
  User,
} from '@contexts/UserContext/types';

export const onLogIn = async (userInfo: LoginUserInfo) => {
  const res: ResType<User> = await request.post('login', userInfo);

  return res;
};

export const onLogOut = async () => {
  const res: ResType<any> = await request.get(
    '1e872d4a-2267-4f77-a5cb-4e229f5eb94c'
  );

  return res;
};

export const onRegister = async (registerUserInfo: RegisterUserInfo) => {
  const res: ResType<any> = await request.post('signup', registerUserInfo);

  return res;
};

export const onRegisterCheck = async (check: OverlapCheckInfo) => {
  const res: ResType<any> = await request.get(
    `/signup/check?type=${check.type}&value=${check.value}`
  );

  return res;
};

export const onConfirmPassword = async (password: 'passwordConfirm') => {
  const res: ResType<any> = await request.post('/members/check/password', {
    password,
  });

  return res;
};
