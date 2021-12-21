import { MainContainer } from '@components/atoms';
import { Header, ProfileEdit } from '@components/domains';
import UserContext from '@contexts/UserContext';
import useLoginCheck from '@hooks/useLoginCheck';
import React, { useContext, useEffect } from 'react';

const UserProfileEditPage = () => {
  const { isFirst, handleCheck } = useLoginCheck();
  const { state } = useContext(UserContext);

  useEffect(() => {
    if (!isFirst) handleCheck();
  }, [isFirst, handleCheck]);

  return (
    <MainContainer>
      <Header />
      <ProfileEdit email={state.email} />
    </MainContainer>
  );
};

export default UserProfileEditPage;
