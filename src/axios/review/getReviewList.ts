import request from '@axios/index';
import { ResType } from '@axios/types';
import { ReviewList } from '@contexts/review/types';

const getReviewList = async () => {
  const res: ResType<ReviewList> = await request.get(
    '/3760323b-5d58-4393-bfbd-85517828347a'
  );
  return res;
};

export default getReviewList;
