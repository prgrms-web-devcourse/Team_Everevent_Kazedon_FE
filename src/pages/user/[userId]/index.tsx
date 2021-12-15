import { useRouter } from 'next/dist/client/router';
import React from 'react';

const UserDetailPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  return <div>{userId} 유저 정보 조회 페이지</div>;
};

export default UserDetailPage;
