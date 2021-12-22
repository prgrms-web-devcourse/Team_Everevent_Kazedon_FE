import { Button, HeaderText, Modal, Text } from '@components/atoms';
import { useEvent } from '@contexts/event';
import { Event } from '@contexts/event/types';
import UserContext from '@contexts/UserContext';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useControlModal from '@hooks/useControlModal';
import useLoginCheck from '@hooks/useLoginCheck';
import { marginBottom } from '@utils/computed';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

const modalConfirmButtonCSS = css`
  position: absolute;
  bottom: 24px;
`;

interface EventDetailHeaderProps extends Partial<Event> {
  [index: string]: any;
}

interface ModalType {
  type: 'like' | 'favorite' | 'notParticipated' | 'participated';
  status: 200 | 409 | 500;
}

const EventDetailHeader = ({
  expiredAt,
  marketName,
  name,
  isLike,
  isFavorite,
  participateStatus,
}: EventDetailHeaderProps) => {
  const router = useRouter();
  const isParticipated = useMemo(
    () => participateStatus !== 'notParticipated',
    [participateStatus]
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>({
    type: 'like',
    status: 200,
  });
  const modalMessage = {
    like: {
      200: '',
      409: '이미 좋아요를 누르셨어요!',
      500: '서버 측에서 오류가 발생했네요!',
    },
    favorite: {
      200: '',
      409: '',
      500: '서버 측에서 오류가 발생했네요!😂',
    },
    notParticipated: {
      200: '이제 이벤트에 참여할 수 있어요~🎉',
      409: '앗! 이미 참여를 하신 것 같은데요?! 한 번 확인해주세요!',
      500: '앗! 요청에 문제가 있는 것 같아요. 다시 시도해주시겠어요? 😂',
    },
    participated: {
      200: `
        이벤트를 완전히 참여하셨어요! 
        리뷰를 하러 갈까요? 🎉
      `,
      409: '이미 참여 확인이 완료 됐어요! 리뷰를 하러 갈까요? 🎉',
      500: '앗! 요청에 문제가 있는 것 같아요. 다시 시도해주시겠어요? 😂',
    },
  } as const;

  const handleModal = useCallback((visible) => {
    setModalVisible(() => visible);
  }, []);

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
    if (!resStatus) {
      setModalType((state) => ({ ...state, type: 'like', status: resStatus }));
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
    setModalType((state) => ({
      ...state,
      type: 'favorite',
      status: resStatus,
    }));
    if (resStatus === 500) {
      setModalVisible(() => true);
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
    if (participateStatus === 'completed') {
      router.push(`/event/${eventId}/create`);
      return;
    }
    if (!isParticipated) {
      const resStatus = await dispatchParticipateEvent({ eventId });
      setModalType((state) => ({
        ...state,
        type: 'notParticipated',
        status: resStatus || 200,
      }));
      setModalVisible(() => true);
      await dispatchEvent({ eventId });
    }
    if (isParticipated) {
      const resStatus = await dispatchCompleteParticipateEvent({
        eventId,
      });
      /* eslint-disable-next-line */
      setModalType((state) => ({
        ...state,
        type: 'participated',
        status: resStatus || 200,
      }));

      setModalVisible(() => true);
    }
  }, [
    isLoading,
    isParticipated,
    participateStatus,
    router,
    dispatchParticipateEvent,
    dispatchEvent,
    dispatchCompleteParticipateEvent,
    setControlModalVisible,
    setRequestType,
    userState.userType.type,
  ]);

  const onModalButtonClick = () => {
    if (
      modalType.type === 'participated' &&
      (modalType.status === 409 || modalType.status === 200)
    ) {
      const { eventId } = router.query;
      router.push(`/event/${eventId}/create`);
      return;
    }
    handleModal(false);
  };
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
        <Text size="small">{`~ ${expiredAt}`}</Text>
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
          ? participateStatus === 'completed'
            ? '리뷰 작성하기'
            : '참여 완료하기'
          : '참여하기'}
      </Button>
      <ControlModal
        visible={controlModalVisible}
        onClose={handleControlModalClose}
        requestType={requestType}
      />
      {modalMessage[modalType.type][modalType.status] && (
        <Modal
          modalType="default"
          width={320}
          height={200}
          padding={20}
          visible={modalVisible}
          onClose={() => handleModal(false)}
          clickAway
        >
          {modalType.type && (
            <>
              <HeaderText level={2} css={marginBottom(16)}>
                {modalType.status !== 200 ? '오류 발생' : '참여 완료'}
              </HeaderText>
              <Text>{modalMessage[modalType.type][modalType.status]}</Text>
              <Button
                css={modalConfirmButtonCSS}
                onClick={() => onModalButtonClick()}
              >
                확인
              </Button>
            </>
          )}
        </Modal>
      )}
    </StyledEventDetailHeader>
  );
};

export default EventDetailHeader;
