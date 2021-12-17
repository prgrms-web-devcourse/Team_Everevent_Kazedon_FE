import { MainContainer } from '@components/atoms';
import { Header, ProfileEdit } from '@components/domains';
import React from 'react';

const UserProfileEditPage = () => {
  return (
    <MainContainer>
      <Header />
      <ProfileEdit email="테스트아이디" />
    </MainContainer>
  );
};

export default UserProfileEditPage;
