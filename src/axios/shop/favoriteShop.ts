import request from '@axios/index';
import { ResType } from '@axios/types';

const favoriteShop = async (eventId: string) => {
  const res: ResType<any> = await request.post(`/favorites/markets/${eventId}`);
  return res;
};

export default favoriteShop;
