/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react';
// import { useRouter } from 'next/router';
import MainContainer from '@components/atoms/MainContainer';
// import { useEvent } from '@contexts/event/index';
import { HeaderText } from '@components/atoms';
import { Header, Tab } from '@components/domains';
import type { NextPage } from 'next';
import UserContext from '@contexts/UserContext';
// import eventList from '@fixtures/events';

const UserEventHistoryPage: NextPage = () => {
  // const { eventList, dispatchEventList, initializeEventList } = useEvent();
  // const router = useRouter();
  const useUser = () => useContext(UserContext);
  /* eslint-disable-next-line */
  const { state } = useUser();

  // const handleCardClick = useCallback(
  //   (eventId = 'e49e47f9-739a-4014-8395-efa1f810aebb') => {
  //     router.push(`/event/${eventId}`);
  //   },
  //   [router]
  // );

  // useEffect(() => {
  //   dispatchEventList();
  //   return () => initializeEventList();
  // }, [dispatchEventList, initializeEventList]);

  return (
    <MainContainer paddingWidth={24}>
      <Header isVisiblePrev />
      <HeaderText level={1}>활동내역</HeaderText>
      <Tab leftText="이벤트(좋아요)" rightText="가게(즐겨찾기)" />
      {/* <CardList flexType="column" padding={0} margin="10px 0 0 0">
        {eventList.map((data, idx) => (
          <EventCard
            onClick={() => handleCardClick()}
            key={data.eventId}
            // eventData={}
            idx={idx}
            marginHeight={10}
          />
        ))}
      </CardList> */}
    </MainContainer>
  );
};

export default UserEventHistoryPage;
