import request from '@axios/index';
import { ResType } from '@axios/types';
import { EventDetail } from '@contexts/event/types';
import { Errors } from '@utils/index';
import { GetEventParamTypes } from './types';

const getEvent = async ({ eventId }: GetEventParamTypes) => {
  // if (!eventId) return;
  /* eslint-disable no-console */
  if (typeof eventId === 'object') {
    console.warn('nowParam is array: ', eventId);
    return {
      data: null,
      headers: null,
      error: {
        code: 400,
        message: Errors.wrongRequest,
      },
    };
  }

  const res: ResType<EventDetail> = await request.get(
    `/events/${eventId as string}`
  );

  return res;
};

export default getEvent;
