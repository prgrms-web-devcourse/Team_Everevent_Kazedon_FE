import React from 'react';
import { MainContainer, HeaderText } from '@components/atoms';
import EventCreateForm from '@components/domains/EventCreateForm';

const EventCreatePage = () => {
  return (
    <MainContainer paddingWidth={24} paddingHeight={96}>
      <HeaderText level={1} marginBottom={48}>
        이벤트 만들기
      </HeaderText>
      <EventCreateForm />
    </MainContainer>
  );
};

export default EventCreatePage;
