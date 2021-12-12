import CardContainer, {
  CardBgColorTypes,
} from '@components/atoms/CardContainer';
import Text from '@components/atoms/Text';
import { Event } from '@contexts/event/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React from 'react';
import LikeButton from '@components/domains/LikeButton';

const StyledReviewCount = styled.section`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
`;

const marginBottomCSS = (width = '4') => css`
  margin-bottom: ${width}px;
`;

const marginLeftCSS = (width = '4') => css`
  margin-left: ${width}px;
`;

export interface EventCardProps {
  eventData: Event;
  idx: number;
  width?: number | string;
  marginWidth?: number | string;
  marginHeight?: number | string;
  onClick: (eventId: string) => void;
}

const EventCard = ({
  eventData,
  idx,
  width = 'auto',
  marginWidth = 0,
  marginHeight = 10,
  onClick,
}: EventCardProps) => {
  const {
    expiredAt,
    name,
    marketName,
    isLike,
    likeCount,
    reviewCount,
    maxParticipants,
  } = eventData as Event;
  const cardBgColorKeys = Object.keys(styles.cardBackgroundColors);
  const colorLength = cardBgColorKeys.length;

  const handleLikeButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    // TODO: 로딩을 걸어서, 만약 로딩 중에 또 눌렀다면 dispatch가 실행되지 않도록 해야 한다.
    /* eslint-disable no-console */
    console.log(`좋아요가 등록되었습니다.`);
  };
  return (
    <CardContainer
      width={width}
      padding={20}
      bgColorName={cardBgColorKeys[idx % colorLength] as CardBgColorTypes}
      cardType="default"
      key={expiredAt + marketName}
      marginWidth={marginWidth}
      marginHeight={marginHeight}
      onClick={onClick}
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
      <LikeButton
        isLike={isLike}
        likeCount={likeCount}
        onClick={handleLikeButtonClick}
      />
    </CardContainer>
  );
};

export default EventCard;
