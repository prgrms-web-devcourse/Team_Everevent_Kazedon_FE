import { ResType } from '@axios/types';
import request from '@axios/index';

const completeParticipateEvent = async ({ eventId }: { eventId: number }) => {
  if (!eventId) return;
  const res: ResType<any> = await request.patch(
    `/events/${eventId}/participants`
  );
  return {
    ...res,
    data: {
      completed: !res.error.code,
    },
  };
};

export default completeParticipateEvent;
