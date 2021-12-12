import request from '@axios/index';
import { ResType } from '@axios/types';
import { RegisterUserInfo } from '@contexts/UserContext/types';

// url 변경필요
const onRegister = async (registerUserInfo: RegisterUserInfo) => {
  const res: ResType<any> = await request.post(
    '1e872d4a-2267-4f77-a5cb-4e229f5eb94c',
    registerUserInfo
  );

  return res;
};

export default onRegister;
