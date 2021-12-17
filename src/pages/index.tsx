import Button from '@components/atoms/Button';
import CardList from '@components/atoms/CardList';
import MainContainer from '@components/atoms/MainContainer';
import EventCard from '@components/domains/EventCard';
import Header from '@components/domains/Header';
import SortButtons, { buttonArrType } from '@components/domains/SortButtons';
import { useEvent } from '@contexts/event';
import { css } from '@emotion/react';
import styles from '@styles/index';
import type { NextPage } from 'next';
import React, { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from '@components/atoms';

const AddressButtonCSS = css`
  margin-top: 60px;
  margin-bottom: 20px;
  color: ${styles.colors.primary};
`;
const MainPage: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  /* eslint-disable-next-line */
  const [userAddress, setUserAddress] = useState(null);
  const { eventList, dispatchEventList, initializeEventList } = useEvent();
  const router = useRouter();

  const handleCardClick = useCallback(
    (eventId = 'e49e47f9-739a-4014-8395-efa1f810aebb') => {
      router.push(`/event/${eventId}`);
    },
    [router]
  );

  const closeModal = () => {
    setModalVisible(() => false);
  };
  useEffect(() => {
    if (!window) return;
    if (!userAddress) {
      setModalVisible(() => true);
      return;
    }
    dispatchEventList({
      location: userAddress,
      sort: 'desc',
      page: 0,
      size: 10,
    });
    return () => initializeEventList();
  }, [userAddress, dispatchEventList, initializeEventList]);

  /* eslint-disable no-console */
  const buttonArr = [
    ['추천순', () => console.log('추천순')],
    ['등록순', () => console.log('등록순')],
    ['마감순', () => console.log('마감순')],
    ['좋아요순', () => console.log('좋아요순')],
  ] as buttonArrType[];

  return (
    <MainContainer paddingWidth={24}>
      <Header isVisiblePrev={false} />
      <Button
        fontSize={styles.fontSize.large}
        reversal
        width="auto"
        padding={0}
        css={AddressButtonCSS}
      >
        광진구 화양동
      </Button>
      <SortButtons width={230} buttonArr={buttonArr} buttonMargin={16} />
      <CardList flexType="column" padding={0} margin="10px 0 0 0">
        {eventList.map((data, idx) => (
          <EventCard
            onClick={() => handleCardClick()}
            key={data.eventId}
            eventData={data}
            idx={idx}
            marginHeight={10}
          />
        ))}
      </CardList>
      <Modal
        width={300}
        height={400}
        modalType="default"
        padding={24}
        visible={modalVisible}
        onClose={closeModal}
        clickAway={false}
      />
    </MainContainer>
  );
};

export default MainPage;
