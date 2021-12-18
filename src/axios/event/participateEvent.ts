import request from '@axios/index';
import { ResType } from '@axios/types';

const participateEvent = async ({ eventId }: { eventId: string }) => {
  if (!eventId) return;
  const res: ResType<any> = await request.post(
    `/events/${eventId}/participants`
  );
  return {
    ...res,
    data: {
      participated: !res.error.code,
    },
  };
};

export default participateEvent;
