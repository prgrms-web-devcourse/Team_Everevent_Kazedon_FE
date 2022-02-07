import CardContainer, {
  CardBgColorTypes,
} from '@components/atoms/CardContainer';
import Text from '@components/atoms/Text';
import { Event } from '@contexts/event/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React, { useContext, useMemo } from 'react';
import LikeButton from '@components/domains/LikeButton';
import useControlModal from '@hooks/useControlModal';
import { UserContext } from '@contexts/userInfo';
import getConvertedDate from '@utils/date';
import { Icon } from '@components/atoms';
import { MdOutlineChatBubble } from 'react-icons/md';
import { useEvent } from '@contexts/event';
import { ControlModal } from '.';

const StyledReviewCount = styled.section`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
`;

const nameCSS = css`
  margin-bottom: 16px;
  font-weight: 700;
`;
const marginBottomCSS = (width: string | number = '4') => css`
  margin-bottom: ${width}px;
`;

const marginLeftCSS = (width = '4') => css`
  margin-left: ${width}px;
`;

export interface EventCardProps {
  eventData?: Event;
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
    eventId,
    expiredAt,
    name,
    marketName,
    isLike,
    likeCount,
    reviewCount,
    remainingParticipants,
  } = eventData as Event;
  const cardBgColorKeys = Object.keys(styles.cardBackgroundColors);
  const colorLength = cardBgColorKeys.length;
  const { user } = useContext(UserContext);
  const { dispatchEventListLike } = useEvent();

  const {
    requestType,
    setRequestType,
    controlModalVisible,
    setControlModalVisible,
  } = useControlModal();
  const handleControlModalClose = () => {
    setControlModalVisible(false);
  };

  const handleLikeButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    // TODO: 로딩을 걸어서, 만약 로딩 중에 또 눌렀다면 dispatch가 실행되지 않도록 해야 한다.
    /* eslint-disable no-console */
    dispatchEventListLike(eventId, isLike);

    if (!user.userId) {
      setRequestType(() => '좋아요');
      setControlModalVisible(true);
    }
  };

  const nowDate = useMemo(() => {
    const date = new Date(expiredAt);
    return getConvertedDate(date);
  }, [expiredAt]);

  return (
    <CardContainer
      width={width}
      padding={20}
      bgColorName={cardBgColorKeys[idx % colorLength] as CardBgColorTypes}
      cardType="default"
      key={eventId}
      marginWidth={marginWidth}
      marginHeight={marginHeight}
      onClick={onClick}
    >
      <Text block size="micro" css={marginBottomCSS(8)}>{`~ ${nowDate}`}</Text>
      <Text block css={nameCSS}>
        {name}
      </Text>
      <Text block size="micro" css={marginBottomCSS(4)}>
        {remainingParticipants ? `${remainingParticipants}명 남음` : ``}
      </Text>
      <Text block size="micro">
        {marketName}
      </Text>
      <StyledReviewCount>
        <Icon>
          <MdOutlineChatBubble color={styles.colors.background} />
        </Icon>
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
      <ControlModal
        visible={controlModalVisible}
        onClose={handleControlModalClose}
        requestType={requestType}
      />
    </CardContainer>
  );
};

export default EventCard;
