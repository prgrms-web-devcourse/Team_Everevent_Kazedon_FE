import { HeaderText, Text } from '@components/atoms';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const DescriptionCSS = css`
  min-height: 32px;
`;

const StyledMarketDescriptions = styled.article`
  margin-top: 4px;
  margin-bottom: 20px;
`;

interface MarketDescriptionsProps extends Partial<Event> {
  marketDescription: string | undefined;
  [prop: string]: any;
}

const MarketDescriptions = ({ marketDescription }: MarketDescriptionsProps) => {
  return (
    <StyledMarketDescriptions>
      <HeaderText level={2} marginBottom={16}>
        가게 소개
      </HeaderText>
      <Text size="small" paragraph css={DescriptionCSS}>
        {marketDescription || '등록된 가게 소개가 없어요!'}
      </Text>
    </StyledMarketDescriptions>
  );
};

export default MarketDescriptions;
