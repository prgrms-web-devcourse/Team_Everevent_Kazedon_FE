import request from '@axios/index';
import { ResType } from '@axios/types';
import { Review } from '@contexts/review/types';

const getReview = async ({ reviewId }: { reviewId: string }) => {
  const res: ResType<Review> = await request.get(`/event/${reviewId}`);
  return res;
};

export default getReview;
