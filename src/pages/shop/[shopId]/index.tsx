import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { MainContainer } from '@components/atoms';
import { Header } from '@components/domains/index';
import {
  ShopDetailHeader,
  ShopCountInfo,
  ShopAddEvent,
  ShopEvents,
} from '@components/domains/ShopDetail/index';
import shopData from 'fixtures/shop';
import shopEventData from 'fixtures/shopEvents';
import styled from '@emotion/styled';

const EventContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ShopDetailPage = () => {
  const router = useRouter();
  const { shopId } = router.query;

  // TODO: shopId에 대한 처리할 예정
  /* eslint-disable no-console */
  console.log(shopId);

  const { marketName, description, eventCount, favoriteCount, reviewCount } =
    shopData;

  return (
    <MainContainer>
      <Header />
      <ShopDetailHeader marketName={marketName} description={description} />
      <EventContentWrapper>
        <ShopCountInfo
          eventCount={Number(eventCount)}
          favoriteCount={Number(favoriteCount)}
          reviewCount={Number(reviewCount)}
        />
        <ShopAddEvent />
        <ShopEvents events={shopEventData} />
      </EventContentWrapper>
    </MainContainer>
  );
};

export default ShopDetailPage;
