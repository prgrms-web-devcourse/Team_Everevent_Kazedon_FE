import request from '@axios/index';
import { ResType } from '@axios/types';
import { Review } from '@contexts/review/types';
import { CreateReviewParams } from './types';

const createReview = async ({
  eventId,
  description,
  picture,
}: CreateReviewParams) => {
  const formData = new FormData();
  formData.append('file', picture);
  formData.append(
    'request',
    new Blob([JSON.stringify({ description })], { type: 'application/json' })
  );
  const res: ResType<Review> = await request.post(
    `/events/${eventId}/reviews`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  // TODO: 추후 picture 기능이 활성화되면 picture을 axios에 추가한다.
  /* eslint-disable no-console */
  console.log(picture);
  return res;
};

export default createReview;
