import request from '@axios/index';
import { ResType } from '@axios/types';
import { Review } from '@contexts/review/types';

const getReview = async ({
  reviewId = 'cd059a42-11bd-4db1-ac48-0ef481bbbd77',
}) => {
  const res: ResType<Review> = await request.get(`/event/${reviewId}`);
  return res;
};

export default getReview;
