import request from '@axios/index';
import { ResType } from '@axios/types';

const unlikeEvent = async (eventId: string) => {
  const res: ResType<any> = await request.delete(`/likes/events/${eventId}`);
  return {
    ...res,
    data: { isLike: !!res.error.code },
  };
};

export default unlikeEvent;
