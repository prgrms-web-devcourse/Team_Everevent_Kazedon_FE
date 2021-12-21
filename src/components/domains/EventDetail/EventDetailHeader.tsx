import { Button, HeaderText, Text } from '@components/atoms';
import { useEvent } from '@contexts/event';
import { Event } from '@contexts/event/types';
import UserContext from '@contexts/UserContext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useControlModal from '@hooks/useControlModal';
import useLoginCheck from '@hooks/useLoginCheck';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect } from 'react';
import { ControlModal } from '..';

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
    dispatchShopFavorite,
    dispatchParticipateEvent,
    dispatchCompleteParticipateEvent,
  } = useEvent();

  const { isFirst, handleCheck } = useLoginCheck();
  const {
    requestType,
    setRequestType,
    controlModalVisible,
    setControlModalVisible,
  } = useControlModal();

  const handleControlModalClose = () => {
    setControlModalVisible(false);
  };

  useEffect(() => {
    if (!isFirst) {
      handleCheck();
    }
  }, [isFirst, handleCheck]);
  const { state: userState } = useContext(UserContext);

  const handleLikeButtonClick = useCallback(async () => {
    if (isLoading) return;
    if (!userState.userType.type) {
      setRequestType(() => '좋아요');
      setControlModalVisible(() => true);
      return;
    }
    const { eventId } = router.query;
    const resStatus = await dispatchEventLike(eventId, isLike);
    if (resStatus === 500) {
      /* eslint-disable-next-line */
      alert('서버 측에서 오류가 발생했어요!');
    }
  }, [
    isLoading,
    setRequestType,
    dispatchEventLike,
    router.query,
    isLike,
    setControlModalVisible,
    userState.userType.type,
  ]);

  const handleFavoriteButtonClick = useCallback(async () => {
    if (isLoading) return;
    if (!userState.userType.type) {
      setRequestType(() => '즐겨찾기');
      setControlModalVisible(() => true);
      return;
    }
    const { eventId } = router.query;
    const resStatus = await dispatchShopFavorite(eventId, isFavorite);
    if (resStatus === 500) {
      /* eslint-disable-next-line */
      alert('서버 측에서 오류가 발생했어요!');
    }
  }, [
    isLoading,
    dispatchShopFavorite,
    router.query,
    isFavorite,
    userState,
    setRequestType,
    setControlModalVisible,
  ]);

  const onParticipateButtonClick = useCallback(async () => {
    if (isLoading) return;
    if (!userState.userType.type) {
      setRequestType(() => '이벤트 참여');
      setControlModalVisible(() => true);
      return;
    }
    const { eventId } = router.query;
    if (!isParticipated) {
      const resStatus = await dispatchParticipateEvent({ eventId });
      /* eslint-disable-next-line */
      alert(
        resStatus === null
          ? '이벤트를 이제 참여할 수 있어요 ~ 🎉'
          : resStatus === 409
          ? '앗! 이미 참여를 하신 것 같은데요?! 한 번 확인해주세요!'
          : '앗! 요청에 문제가 있는 것 같아요. 다시 시도해주시겠어요? 😂'
      );
      await dispatchEvent({ eventId });
    }
    if (isParticipated && !isCompleted) {
      const resStatus = await dispatchCompleteParticipateEvent({
        eventId,
      });
      /* eslint-disable-next-line */
      alert(
        resStatus === null
          ? '이벤트를 완전히 참여하게 되셨어요! 리뷰를 하러 갈까요? 🎉'
          : resStatus === 409
          ? '이미 참여 확인이 완료 됐어요! 리뷰를 하러 갈까요? 🎉'
          : '앗! 요청에 문제가 있는 것 같아요. 다시 시도해주시겠어요? 😂'
      );
      // await dispatchEvent({ eventId });
    }
    if (isCompleted) {
      router.push(`/event/${eventId}/create`);
    }
  }, [
    isLoading,
    isParticipated,
    router,
    dispatchParticipateEvent,
    dispatchEvent,
    isCompleted,
    dispatchCompleteParticipateEvent,
    setControlModalVisible,
    setRequestType,
    userState.userType.type,
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
      <ControlModal
        visible={controlModalVisible}
        onClose={handleControlModalClose}
        requestType={requestType}
      />
    </StyledEventDetailHeader>
  );
};

export default EventDetailHeader;
