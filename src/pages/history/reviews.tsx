// import { useEffect, useCallback, useContext } from 'react';
// import { useRouter } from 'next/router';
// import MainContainer from '@components/atoms/MainContainer';
// import { useEvent } from '@contexts/event/index';
// import { HeaderText, CardList } from '@components/atoms';
// import { Header, Tab, ReviewCard } from '@components/domains';
import type { NextPage } from 'next';
// import UserContext from '@contexts/UserContext';

const UserReviewHistoryPage: NextPage = () => {
  // const { eventList, dispatchEventList, initializeEventList } = useEvent();
  // const router = useRouter();
  // const useUser = () => useContext(UserContext);
  // const { state } = useUser();

  // const handleCardClick = useCallback(
  //   (eventId = 'e49e47f9-739a-4014-8395-efa1f810aebb') => {
  //     router.push(`/history/${eventId}`);
  //   },
  //   [router]
  // );

  // useEffect(() => {
  //   dispatchEventList();
  //   return () => initializeEventList();
  // }, [dispatchEventList, initializeEventList]);

  return null;
  //   <MainContainer paddingWidth={24}>
  //     <Header isVisiblePrev />
  //     <HeaderText level={1}>활동내역</HeaderText>
  //     <Tab />
  //     <CardList flexType="column" padding={0} margin="10px 0 0 0">
  //       {eventList.map((data, idx) => (
  //         <ReviewCard
  //           cardType="box"
  //           reviewData={data}
  //           // onClick={() => handleCardClick()}
  //           // key={data.eventId}
  //           // eventData={data}
  //           // idx={idx}
  //           // marginHeight={10}
  //         />
  //       ))}
  //     </CardList>
  //   </MainContainer>
  // );
};

export default UserReviewHistoryPage;
