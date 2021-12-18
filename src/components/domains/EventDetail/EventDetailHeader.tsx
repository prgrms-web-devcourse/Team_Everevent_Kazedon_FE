import { Button, HeaderText, Text } from '@components/atoms';
import { useEvent } from '@contexts/event';
import { Event } from '@contexts/event/types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const StyledEventDetailHeader = styled.header`
  margin: 20px 0;
`;
const LikeButtonCSS = css`
  margin-right: 10px;
`;
const FavoriteButtonCSS = css`
  margin-left: 10px;
`;
const PrticipateButtonCSS = css`
  margin: 0 auto;
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
  isCompleted,
}: EventDetailHeaderProps) => {
  const router = useRouter();
  const {
    isLoading,
    dispatchEvent,
    dispatchEventLike,
    dispatchEventFavorite,
    dispatchParticipateEvent,
    eventError,
  } = useEvent();
  const handleLikeButtonClick = useCallback(async () => {
    if (isLoading) return;
    await dispatchEventLike();
  }, [isLoading, dispatchEventLike]);

  const handleFavoriteButtonClick = useCallback(async () => {
    if (isLoading) return;
    await dispatchEventFavorite();
  }, [isLoading, dispatchEventFavorite]);

  const onParticipateButtonClick = useCallback(async () => {
    if (isLoading) return;
    const { eventId } = router.query;
    if (!isParticipated) {
      await dispatchParticipateEvent({ eventId });
      /* eslint-disable-next-line */
      alert(eventError.code ? 'ㅈㅅ!' : '이벤트 참여에 완료되셨어요!');
      await dispatchEvent({ eventId });
    }
    if (isParticipated) {
      router.push(`/event/${eventId}/create`);
    }
  }, [
    isLoading,
    isParticipated,
    router,
    dispatchParticipateEvent,
    dispatchEvent,
    eventError.code,
  ]);

  return (
    <StyledEventDetailHeader>
      <LikeExpiredAtBox>
        <Button
          buttonType="primary"
          reversal={isLike}
          borderRadius={8}
          width={isLike ? 88 : 72}
          height={24}
          fontSize={11}
          border
          css={LikeButtonCSS}
          onClick={handleLikeButtonClick}
        >
          {isLike ? '- 좋아요 취소' : '+ 좋아요'}
        </Button>
        <Text size="small">{`~${expiredAt} 까지`}</Text>
      </LikeExpiredAtBox>
      <HeaderText level={1} css={HeaderTextCSS}>
        {name}
      </HeaderText>
      <MarketInfo>
        <Text size="small">{marketName || ''}</Text>
        <Button
          buttonType="primary"
          reversal={isFavorite}
          borderRadius={8}
          width={isFavorite ? 100 : 80}
          height={24}
          fontSize={11}
          padding={0}
          border
          css={FavoriteButtonCSS}
          onClick={handleFavoriteButtonClick}
        >
          {isFavorite ? '👀 즐겨찾기 완료' : '⭐ 즐겨찾기'}
        </Button>
      </MarketInfo>
      <Button
        display="block"
        buttonType="primary"
        css={PrticipateButtonCSS}
        padding={0}
        fontSize={16}
        onClick={onParticipateButtonClick}
      >
        {isParticipated
          ? isCompleted
            ? '리뷰 작성하기'
            : '참여 완료하기'
          : '참여하기'}
      </Button>
    </StyledEventDetailHeader>
  );
};

export default EventDetailHeader;
