import { Button, HeaderText, Text } from '@components/atoms';
import { Event } from '@contexts/event/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const StyledEventDetailHeader = styled.header`
  margin: 20px 0;
`;
const LikeButtonCSS = css`
  margin-right: 10px;
`;
const FavoriteButtonCSS = css`
  margin-left: 10px;
`;

const LikeExpiredAtBox = styled.div`
  display: flex;
  align-items: center;
`;

const MarketInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderTextCSS = css`
  margin: 10px 0;
`;

interface EventDetailHeaderProps extends Partial<Event> {
  [index: string]: any;
}

const EventDetailHeader = ({
  expiredAt,
  marketName,
  name,
  isLike,
  isFavorite,
  isParticipated,
}: EventDetailHeaderProps) => {
  return (
    <StyledEventDetailHeader>
      <LikeExpiredAtBox>
        {isLike && (
          <Button
            buttonType="primary"
            reversal
            borderRadius={8}
            width={70}
            height={24}
            fontSize={11}
            border
            css={LikeButtonCSS}
          >
            +좋아요
          </Button>
        )}
        <Text size="small">{`~${expiredAt} 까지`}</Text>
      </LikeExpiredAtBox>
      <HeaderText level={1} css={HeaderTextCSS}>
        {name}
      </HeaderText>
      <MarketInfo>
        <Text size="small">{marketName || ''}</Text>
        {isFavorite && (
          <Button
            buttonType="primary"
            reversal
            borderRadius={8}
            width={76}
            height={24}
            fontSize={11}
            padding={0}
            border
            css={FavoriteButtonCSS}
          >
            ⭐ 즐겨찾기
          </Button>
        )}
      </MarketInfo>
      <Button buttonType="primary">
        {isParticipated ? '참여 완료' : '참여 하기'}
      </Button>
    </StyledEventDetailHeader>
  );
};

export default EventDetailHeader;
