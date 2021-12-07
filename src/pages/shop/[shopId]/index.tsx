import { useRouter } from 'next/dist/client/router';
import React from 'react';

const ShopDetailPage = () => {
  const router = useRouter();
  const { shopId } = router.query;
  return <div>{shopId}가게 상세 조회 페이지</div>;
};

export default ShopDetailPage;
