import request from '@axios/index';
import { ResType } from '@axios/types';

const likeEvent = async (eventId: number) => {
  const res: ResType<any> = await request.post(`/likes/events/${eventId}`);
  return {
    ...res,
    data: { isLike: !!res.error.code },
  };
};

export default likeEvent;
