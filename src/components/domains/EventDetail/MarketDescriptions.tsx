import { HeaderText, ImageContainer, Text } from '@components/atoms';
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

const MarketImageBox = styled.section`
  display: flex;
  height: auto;
  margin-top: 10px;

  div {
    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

interface PictureType {
  url: string;
}

interface MarketDescriptionsProps extends Partial<Event> {
  marketDescription: string | undefined;
  pictures: Array<PictureType> | [];
  [prop: string]: any;
}

const MarketDescriptions = ({
  marketDescription,
  pictures,
}: MarketDescriptionsProps) => {
  return (
    <StyledMarketDescriptions>
      <HeaderText level={2} marginBottom={16}>
        내용
      </HeaderText>
      <Text size="small" paragraph css={DescriptionCSS}>
        {marketDescription || '등록된 가게 소개가 없어요!'}
      </Text>
      <MarketImageBox>
        {pictures.map(({ url }, idx) => (
          <ImageContainer
            key={`${url + idx}`}
            src={url}
            alt="가게 사진"
            width={96}
            height={96}
            margin="0 8px"
          />
        ))}
      </MarketImageBox>
    </StyledMarketDescriptions>
  );
};

export default MarketDescriptions;
