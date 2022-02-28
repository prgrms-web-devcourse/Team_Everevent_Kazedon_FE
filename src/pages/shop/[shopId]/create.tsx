import React from 'react';
import { MainContainer, HeaderText } from '@components/atoms';
import EventCreateForm from '@components/domains/EventCreateForm';
import { Header } from '@components/domains/index';
import { marginTop } from '@utils/computed';

const EventCreatePage = () => {
  return (
    <MainContainer>
      <Header />
      <HeaderText level={1} marginBottom={48} css={marginTop(58)}>
        이벤트 만들기
      </HeaderText>
      <EventCreateForm />
    </MainContainer>
  );
};

export default EventCreatePage;
