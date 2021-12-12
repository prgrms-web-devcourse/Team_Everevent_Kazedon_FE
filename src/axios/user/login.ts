import request from '@axios/index';
import { ResType } from '@axios/types';
import { LoginUserInfo } from '@contexts/UserContext/types';

interface LoginUser {
  id: string;
  nickname: string;
}

const onLogIn = async (userInfo: LoginUserInfo) => {
  const res: ResType<LoginUser> = await request.post(
    'ffcd9492-1fe8-476b-9eff-30074dd1c121',
    userInfo
  );

  return res;
};

export default onLogIn;
