import request from '@axios/index';
import { ResType } from '@axios/types';
import { EventListParam, EventListType } from '@contexts/event/types';

const getEventList = async (queryParams: EventListParam) => {
  let queries = '';
  for (const key in queryParams) {
    if (queryParams[key as keyof EventListParam] !== undefined) {
      const nowQuery = `${key}=${queryParams[key as keyof EventListParam]}`;
      queries += !queries.length ? `?${nowQuery}` : `&${nowQuery}`;
    }
  }
  const res: ResType<EventListType> = await request.get(`/events${queries}`);
  return res;
};

export default getEventList;
