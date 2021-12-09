import CardContainer, {
  CardBgColorTypes,
} from '@components/atoms/CardContainer';
import Text from '@components/atoms/Text';
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
  eventData: EventType;
  idx: number;
  width?: number | string;
}

const EventCard = ({ eventData, idx, width = 'auto' }: EventCardProps) => {
  const {
    expiredAt,
    name,
    marketName,
    isLike,
    likeCount,
    reviewCount,
    remainingParticipants,
  } = eventData;
  const cardBgColorKeys = Object.keys(styles.cardBackgroundColors);
  const colorLength = cardBgColorKeys.length;
  return (
    <CardContainer
      width={width}
      padding={20}
      margin="8px 0"
      bgColorName={cardBgColorKeys[idx % colorLength] as CardBgColorTypes}
      cardType="default"
      key={expiredAt + marketName}
    >
      <Text
        block
        size="micro"
        css={marginBottomCSS()}
      >{`~(${expiredAt})`}</Text>
      <Text block bold css={marginBottomCSS('16')}>
        {name}
      </Text>
      <Text block size="micro">{`${remainingParticipants}명 남음`}</Text>
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
          {reviewCount}
        </Text>
      </StyledReviewCount>
      <StyledLikeButton>
        <Text block size="large" css={marginBottomCSS()}>
          {isLike ? '💗' : '🖤'}
        </Text>
        <Text block size="micro" color={styles.colors.background}>
          {likeCount}
        </Text>
      </StyledLikeButton>
    </CardContainer>
  );
};

export default EventCard;
