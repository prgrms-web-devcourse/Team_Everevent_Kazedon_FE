import { MainContainer } from '@components/atoms';
import { ProfileEdit } from '@components/domains';
import React from 'react';

const UserProfileEditPage = () => {
  return (
    <MainContainer>
      <ProfileEdit email="테스트아이디" />
    </MainContainer>
  );
};

export default UserProfileEditPage;
