import { useRouter } from 'next/dist/client/router';
import React from 'react';

const EventCreatePage = () => {
  const router = useRouter();
  const { shopId } = router.query;
  return <div>{shopId} 가게 이벤트 만들기 페이지</div>;
};

export default EventCreatePage;
