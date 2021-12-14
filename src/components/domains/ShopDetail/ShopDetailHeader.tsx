import React from 'react';
import { HeaderText, Text } from '@components/atoms';
import { Shop } from '@contexts/Shop/types';
import styled from '@emotion/styled';

const ShopDetailHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 58px;
  margin-bottom: 24px;
`;

const ShopDescriptionWrapper = styled.div`
  display: flex;
  gap: 30px;
  width: 318px;
`;

const EditButton = styled.button`
  all: unset;
`;

interface ShopDetailHeaderProps extends Partial<Shop> {
  [index: string]: any;
}

const ShopDetailHeader = ({
  marketName,
  description,
}: ShopDetailHeaderProps) => {
  return (
    <ShopDetailHeaderWrapper>
      <HeaderText level={1} marginBottom={24}>
        {marketName}
      </HeaderText>
      <ShopDescriptionWrapper>
        <Text size="small" block fontStyle={{ overflow: 'hidden' }}>
          {description || '가게소개가 없어요!'}
        </Text>
        <EditButton>✏️</EditButton>
      </ShopDescriptionWrapper>
    </ShopDetailHeaderWrapper>
  );
};

export default ShopDetailHeader;
