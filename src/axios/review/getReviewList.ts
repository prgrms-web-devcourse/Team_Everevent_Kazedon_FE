import request from '@axios/index';
import { ResType } from '@axios/types';
import { GetReviewListParam } from '@contexts/review/types';

const getReviewList = async ({
  eventId,
  sort = 'asc',
  page,
  size = 0,
}: GetReviewListParam) => {
  const res: ResType<any> = await request.get(
    `/events/${eventId}/reviews?sort=${sort}&page=${page}&size=${size}`
  );
  return res;
};

export default getReviewList;
