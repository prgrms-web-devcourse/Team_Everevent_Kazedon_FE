import request from '@axios/index';

interface GetEventParamTypes {
  eventId: string;
}

const getEvent = async ({ eventId }: GetEventParamTypes) => {
  /* eslint-disable no-console */
  console.log('nowParam: ', eventId);

  const res = await request.get('/v3/e49e47f9-739a-4014-8395-efa1f810aebb');
  return res;
};

export default getEvent;
