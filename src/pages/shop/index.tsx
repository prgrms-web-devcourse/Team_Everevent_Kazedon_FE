import React, { useContext, useEffect, useState } from 'react';
import { MainContainer } from '@components/atoms';
import { Header } from '@components/domains/index';
import {
  ShopDetailHeader,
  ShopCountInfo,
  ShopAddEvent,
  ShopEvents,
} from '@components/domains/ShopDetail/index';
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
  name: '',
  description: '',
  eventCount: 0,
  likeCount: 0,
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

  const { marketId, name, description, eventCount, likeCount, reviewCount } =
    shopInfo;
  return (
    <MainContainer>
      <Header />
      <ShopDetailHeader
        marketId={marketId}
        marketName={name}
        description={description}
      />
      <EventContentWrapper>
        <ShopCountInfo
          eventCount={Number(eventCount)}
          likeCount={Number(likeCount)}
          reviewCount={Number(reviewCount)}
        />
        <ShopAddEvent marketId={marketId} />
        <ShopEvents marketId={marketId} />
      </EventContentWrapper>
    </MainContainer>
  );
};

export default ShopDetailPage;
