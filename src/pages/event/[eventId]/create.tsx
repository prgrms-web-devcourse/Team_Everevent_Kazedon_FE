import { useRouter } from 'next/dist/client/router';
import React from 'react';

const ReviewCreatePage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  return <div>{eventId} 이벤트 리뷰 작성 페이지</div>;
};

export default ReviewCreatePage;
