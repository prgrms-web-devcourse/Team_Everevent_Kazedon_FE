import request from '@axios/index';
import { ResType } from '@axios/types';

const unfavoriteShop = async (eventId: string) => {
  const res: ResType<any> = await request.delete(
    `/favorites/markets/${eventId}`
  );
  return {
    ...res,
    data: {
      isFavorite: !!res.error.code,
    },
  };
};

export default unfavoriteShop;
