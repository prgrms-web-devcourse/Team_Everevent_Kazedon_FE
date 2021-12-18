import request from '@axios/index';
import { ResType } from '@axios/types';

const likeEvent = async (eventId: number) => {
  const res: ResType<any> = await request.post(`/likes/events/${eventId}`);
  return res;
};

export default likeEvent;
