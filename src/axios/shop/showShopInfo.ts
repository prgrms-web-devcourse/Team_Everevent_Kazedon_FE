import request from '@axios/index';
import { ResType } from '@axios/types';

const showShopInfo = async () => {
  const res: ResType<any> = await request.get(`/markets`);
  return res;
};

export default showShopInfo;
