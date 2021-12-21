import request from '@axios/index';
import { ResType } from '@axios/types';

const showShopEvents = async (marketId: number) => {
  const res: ResType<any> = await request.get(`/markets/${marketId}/events`);
  return res;
};

export default showShopEvents;
