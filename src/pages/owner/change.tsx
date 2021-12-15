import React from 'react';
import { MainContainer } from '@components/atoms';
import { UserChangeForm, Header } from '@components/domains/index';

const UserChangeOwnerPage = () => {
  return (
    <MainContainer paddingWidth={27}>
      <Header />
      <UserChangeForm />
    </MainContainer>
  );
};

export default UserChangeOwnerPage;
