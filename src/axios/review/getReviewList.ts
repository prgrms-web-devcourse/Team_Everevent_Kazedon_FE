import request from '@axios/index';
import { ResType } from '@axios/types';
import { GetReviewListParam, ReviewList } from '@contexts/review/types';

const getReviewList = async ({
  eventId,
  sort = 'asc',
  page,
  size = 0,
}: GetReviewListParam) => {
  const res: ResType<ReviewList> = await request.get(
    `/events/${eventId}/?sort=createAt,${sort}&page=${page}&size=${size}`
  );
  return res;
};

export default getReviewList;
