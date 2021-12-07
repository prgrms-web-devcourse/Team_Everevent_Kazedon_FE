import { useRouter } from 'next/dist/client/router';
import React from 'react';

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  return <div>{eventId} 이벤트 상세 페이지</div>;
};

export default EventDetailPage;
