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
    '/200741df-e6f8-4930-81c5-fb2446246e9e'
  );
  console.log(res);
  return res;
};

export default getEvent;
