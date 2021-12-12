import request from '@axios/index';
import { ResType } from '@axios/types';
import { LoginUserInfo } from '@contexts/UserContext/types';

interface LoginUser {
  id: string;
  nickname: string;
}

const onLogIn = async (userInfo: LoginUserInfo) => {
  const res: ResType<LoginUser> = await request.post(
    '1e872d4a-2267-4f77-a5cb-4e229f5eb94c',
    userInfo
  );

  return res;
};

export default onLogIn;
