import request from '@axios/index';
import { ResType } from '@axios/types';

const favoriteShop = async (eventId: number) => {
  const res: ResType<any> = await request.post(`/favorites/markets/${eventId}`);
  return {
    ...res,
    data: {
      favorite: !res.error.code,
    },
  };
};

export default favoriteShop;
