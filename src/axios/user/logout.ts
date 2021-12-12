import request from '@axios/index';
import { ResType } from '@axios/types';

// url 변경필요
const onLogOut = async () => {
  const res: ResType<any> = await request.get(
    '1e872d4a-2267-4f77-a5cb-4e229f5eb94c'
  );

  return res;
};

export default onLogOut;
