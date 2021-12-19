// import { useRouter } from 'next/dist/client/router';
import React, { useContext, useEffect, useState } from 'react';
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
import { ShopContext } from '@contexts/Shop';
import { ShopInfoData } from '@contexts/Shop/types';

const EventContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const initialState: ShopInfoData = {
  marketId: '',
  description: '',
  eventCount: 0,
  favoriteCount: 0,
  reviewCount: 0,
};

const ShopDetailPage = () => {
  const { getShopInfo } = useContext(ShopContext);
  const [shopInfo, setShopInfo] = useState(initialState);

  useEffect(() => {
    getShopInfo().then((data: ShopInfoData) => {
      setShopInfo(data);
    });
  }, [getShopInfo]);

  const { marketName } = shopData;
  const { description, eventCount, favoriteCount, reviewCount } = shopInfo;
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
