import React from 'react';
import { Text } from '@components/atoms';
import { ShopInfo } from '@contexts/Shop/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Common from '@styles/index';

const ShopCountInfoWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  text-align: center;
`;

const CountCSS = css`
  font-weight: bold;
`;

interface ShopCountInfoProps extends Partial<ShopInfo> {
  [index: string]: any;
}

const ShopCountInfo = ({
  eventCount,
  likeCount,
  reviewCount,
}: ShopCountInfoProps) => {
  return (
    <ShopCountInfoWrapper>
      <Text color={Common.colors.point} css={CountCSS}>
        {(eventCount || 0).toString()}
      </Text>
      <Text color={Common.colors.point} css={CountCSS}>
        {(likeCount || 0).toString()}
      </Text>
      <Text color={Common.colors.point} css={CountCSS}>
        {(reviewCount || 0).toString()}
      </Text>
      <Text size="small">이벤트 진행</Text>
      <Text size="small">받은 좋아요</Text>
      <Text size="small">받은 리뷰</Text>
    </ShopCountInfoWrapper>
  );
};

export default ShopCountInfo;
