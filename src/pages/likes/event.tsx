import { useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import MainContainer from '@components/atoms/MainContainer';
import { HeaderText, CardList } from '@components/atoms';
import { Header, Tab, EventCard } from '@components/domains';
import type { NextPage } from 'next';
import { UserContext } from '@contexts/userInfo';
import { useUserHistory } from '@contexts/userHistory';
import useLoginCheck from '@hooks/useLoginCheck';
import { marginBottom } from '@utils/computed';

const UserLikeDetailPage: NextPage = () => {
  const {
    likeEventList: likeEvents,
    dispatchLikeEvents,
    initializeHistory,
  } = useUserHistory();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { isFirst, handleCheck } = useLoginCheck();

  useEffect(() => {
    if (!isFirst) handleCheck();
  }, [isFirst, handleCheck]);

  const handleCardClick = useCallback(
    (eventId) => {
      router.push(`/event/${eventId}`);
    },
    [router]
  );

  const handleTabLeftClick = useCallback(() => {
    router.push(`/likes/event`);
  }, [router]);

  const handleTabRightClick = useCallback(() => {
    router.push(`/likes/shop`);
  }, [router]);

  useEffect(() => {
    dispatchLikeEvents(user.userId);
    return () => initializeHistory();
  }, [dispatchLikeEvents, user.userId, initializeHistory]);

  return (
    <MainContainer paddingWidth={24}>
      <Header isVisiblePrev />
      <HeaderText level={1} marginBottom={32}>
        {`${user.nickname}님의 즐겨찾기 / 좋아요`}
      </HeaderText>
      <Tab
        width={320}
        isLeft
        isLeftFocused
        leftText="좋아요"
        rightText="즐겨찾기"
        onClick={(id) => handleCardClick(id)}
        onClickLeft={handleTabLeftClick}
        onClickRight={handleTabRightClick}
        css={marginBottom(16)}
      />
      <CardList flexType="column" padding={0} margin="10px 0 0 0">
        {likeEvents &&
          likeEvents.map((likeEvent, idx) => (
            <EventCard
              onClick={() => handleCardClick(likeEvent.eventId)}
              key={likeEvent.eventId}
              idx={idx}
              eventData={likeEvent}
              marginHeight={10}
            />
          ))}
      </CardList>
    </MainContainer>
  );
};

export default UserLikeDetailPage;
