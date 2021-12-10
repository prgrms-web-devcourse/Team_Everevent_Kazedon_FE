import CardContainer, {
  CardBgColorTypes,
} from '@components/atoms/CardContainer';
import Text from '@components/atoms/Text';
import { Event } from '@contexts/eventList/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React from 'react';

const StyledReviewCount = styled.section`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
`;
const StyledLikeButton = styled.section`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
`;

const marginBottomCSS = (width = '4') => css`
  margin-bottom: ${width}px;
`;
const marginLeftCSS = (width = '4') => css`
  margin-left: ${width}px;
`;

export interface EventType {
  expiredAt: string;
  name: string;
  marketName: string;
  isLike: boolean;
  likeCount: string;
  reviewCount: string;
  remainingParticipants?: string;
}

export interface EventCardProps {
  eventData: Event;
  idx: number;
  width?: number | string;
  marginWidth?: number | string;
  marginHeight?: number | string;
}

const EventCard = ({
  eventData,
  idx,
  width = 'auto',
  marginWidth = 0,
  marginHeight = 10,
}: EventCardProps) => {
  const {
    expiredAt,
    name,
    marketName,
    isLike,
    likeCount,
    reviewCount,
    maxParticipants,
  } = eventData;
  const cardBgColorKeys = Object.keys(styles.cardBackgroundColors);
  const colorLength = cardBgColorKeys.length;
  return (
    <CardContainer
      width={width}
      padding={20}
      bgColorName={cardBgColorKeys[idx % colorLength] as CardBgColorTypes}
      cardType="default"
      key={expiredAt + marketName}
      marginWidth={marginWidth}
      marginHeight={marginHeight}
    >
      <Text
        block
        size="micro"
        css={marginBottomCSS()}
      >{`~(${expiredAt})`}</Text>
      <Text block bold css={marginBottomCSS('16')}>
        {name}
      </Text>
      <Text block size="micro">{`${maxParticipants}명 남음`}</Text>
      <Text block size="micro">
        {marketName}
      </Text>
      <StyledReviewCount>
        <div>💬</div>
        <Text
          block
          size="micro"
          color={styles.colors.background}
          css={marginLeftCSS()}
        >
          {`${reviewCount || 0}`}
        </Text>
      </StyledReviewCount>
      <StyledLikeButton>
        <Text block size="large" css={marginBottomCSS()}>
          {isLike ? '💗' : '🖤'}
        </Text>
        <Text block size="micro" color={styles.colors.background}>
          {`${likeCount || 0}`}
        </Text>
      </StyledLikeButton>
    </CardContainer>
  );
};

export default EventCard;
