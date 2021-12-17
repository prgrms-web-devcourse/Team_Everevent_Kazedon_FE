import React from 'react';
import { MainContainer, HeaderText } from '@components/atoms';
import EventCreateForm from '@components/domains/EventCreateForm';
import { useRouter } from 'next/dist/client/router';

const EventCreatePage = () => {
  const router = useRouter();
  const { shopId } = router.query;

  // TODO: shopId 관련하여 추후 처리 예정
  // eslint-disable-next-line no-console
  console.log(shopId);
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
