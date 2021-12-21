import request from '@axios/index';
import { ResType } from '@axios/types';

const updateShopInfo = async (marketId: number, description: string) => {
  const res: ResType<any> = await request.patch(
    `/markets/${marketId}`,
    description
  );

  return res;
};

export default updateShopInfo;
