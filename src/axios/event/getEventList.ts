import request from '@axios/index';
import { ResType } from '@axios/types';
import { EventListType } from '@contexts/event/types';
import { EventListParam } from './types';

const getEventList = async (queryParams: EventListParam) => {
  let queries = '';
  for (const key in queryParams) {
    if (queryParams[key as keyof EventListParam]) {
      queries += `&${key}=${queryParams[key as keyof EventListParam]}`;
    }
  }
  const res: ResType<EventListType> = await request.get(`/events${queries}`);
  return res;
};

export default getEventList;
