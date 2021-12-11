import request from '@axios/index';
import { ResType } from '@axios/types';

interface GetEventParamTypes {
  eventId: string | undefined | string[];
}

const getEvent = async ({ eventId }: GetEventParamTypes) => {
  /* eslint-disable no-console */
  if (typeof eventId === 'object') {
    console.warn('nowParam is array ', eventId);
  }

  const res: ResType = await request.get(
    '/e49e47f9-739a-4014-8395-efa1f810aebb'
  );
  return res;
};

export default getEvent;
