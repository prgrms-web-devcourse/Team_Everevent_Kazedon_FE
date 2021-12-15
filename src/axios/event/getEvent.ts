import request from '@axios/index';
import { ResType } from '@axios/types';
import { Event } from '@contexts/event/types';

interface GetEventParamTypes {
  eventId: string | undefined | string[];
}

const getEvent = async ({ eventId }: GetEventParamTypes) => {
  /* eslint-disable no-console */
  if (typeof eventId === 'object') {
    console.warn('nowParam is array ', eventId);
  }

  const res: ResType<Event> = await request.get(
    '/200741df-e6f8-4930-81c5-fb2446246e9e'
  );

  return res;
};

export default getEvent;
