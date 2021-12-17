import request from '@axios/index';
import { ResType } from '@axios/types';
import { Event } from '@contexts/event/types';
import constants from '@utils/index';
import { GetEventParamTypes } from './types';

const getEvent = async ({ eventId }: GetEventParamTypes) => {
  /* eslint-disable no-console */
  if (typeof eventId === 'object') {
    console.warn('nowParam is array: ', eventId);
    return {
      data: null,
      headers: null,
      error: {
        code: 400,
        message: constants.ERROR_MSG.wrongRequest,
      },
    };
  }

  const res: ResType<Event> = await request.get(`/${eventId as string}`);

  return res;
};

export default getEvent;
