import request from '@axios/index';

const getEventList = async () => {
  const res = await request.get('/v3/96effad6-e14a-4094-9ab4-d7932bf1bc33');
  return res;
};

export default getEventList;
