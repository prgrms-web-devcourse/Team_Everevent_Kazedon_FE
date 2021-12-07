import { useRouter } from 'next/dist/client/router';
import React from 'react';

const ReviewDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  return <div>{eventId} 리뷰 상세 페이지</div>;
};

export default ReviewDetailPage;
