import { MainContainer } from '@components/atoms';
import { Header, ProfileEdit } from '@components/domains';
import { UserContext } from '@contexts/userInfo';
import useLoginCheck from '@hooks/useLoginCheck';
import React, { useContext, useEffect } from 'react';

const UserProfileEditPage = () => {
  const { isFirst, handleCheck } = useLoginCheck();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!isFirst) handleCheck();
  }, [isFirst, handleCheck]);

  return (
    <MainContainer>
      <Header />
      <ProfileEdit email={user.email} />
    </MainContainer>
  );
};

export default UserProfileEditPage;
