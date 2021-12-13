import request from '@axios/index';
import { ResType } from '@axios/types';
import { LoginUserInfo, RegisterUserInfo } from '@contexts/UserContext/types';

interface LoginUser {
  id: string;
  nickname: string;
}

interface CheckInfo {
  type: string;
  value?: string;
}

export const onLogIn = async (userInfo: LoginUserInfo) => {
  const res: ResType<LoginUser> = await request.post(
    'ffcd9492-1fe8-476b-9eff-30074dd1c121',
    userInfo
  );

  return res;
};

export const onLogOut = async () => {
  const res: ResType<any> = await request.get(
    '1e872d4a-2267-4f77-a5cb-4e229f5eb94c'
  );

  return res;
};

export const onRegister = async (registerUserInfo: RegisterUserInfo) => {
  const res: ResType<any> = await request.post(
    '1e872d4a-2267-4f77-a5cb-4e229f5eb94c',
    registerUserInfo
  );

  return res;
};

export const onRegisterCheck = async (check: CheckInfo) => {
  const res: ResType<any> = await request.get(
    `/signup/check?type=${check.type}&value=${check.value}`
  );

  return res;
};
