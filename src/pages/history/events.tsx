/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react';
// import { useRouter } from 'next/router';
// import MainContainer from '@components/atoms/MainContainer';
// import { useEvent } from '@contexts/event/index';
// import { CardContainer, CardList, HeaderText, Text } from '@components/atoms';
// import { EventCard, Header, Tab } from '@components/domains';
import type { NextPage } from 'next';
// import UserContext from '@contexts/UserContext';
// import styles from '@styles/index';
// import { css } from '@emotion/react';
// import styled from '@emotion/styled';
// import { marginBottom } from '@utils/computed';

// const NoEventListCardCSS = css`
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   strong {
//     font-weight: 700;
//   }
// `;

const UserEventHistoryPage: NextPage = () => {
  // const { eventList, dispatchEventList, initializeEventList } = useEvent();
  // const [userAddress, setUserAddress] = useState<string | null>(null);
  // const [buttonFocus, setButtonFocus] = useState(true);
  // const router = useRouter();
  // const useUser = () => useContext(UserContext);
  // const { state } = useUser();

  // const handleCardClick = (eventId: string) => {
  //   router.push(`/event/${eventId}`);
  // };

  // const Wrapper = styled.div`
  //   display: flex;
  //   flex-direction: column;
  //   margin-bottom: 32px;
  // `;

  // useEffect(() => {
  //   dispatchEventList();
  //   return () => initializeEventList();
  // }, [dispatchEventList, initializeEventList]);

  const handleChangeTab = (e: React.MouseEvent) => {
    const { id } = e.currentTarget as HTMLElement;

    if (id === 'left') setButtonFocus(true);
    else if (id === 'right') setButtonFocus(false);
  };

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
