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
import { CardContainer, Input, Modal, Text } from '@components/atoms';
import { setStorage } from '@utils/storage';
import { USER_ADDRESS_KEY } from '@utils/constantUser';

const AddressButtonCSS = css`
  margin-top: 60px;
  margin-bottom: 20px;
  color: ${styles.colors.primary};
`;

const NoEventListCardCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;

  strong {
    font-weight: 700;
  }
`;

const MainPage: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  /* eslint-disable-next-line */
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [addressValue, setAddressValue] = useState<string>('');
  const { eventList, dispatchEventList, initializeEventList } = useEvent();
  const router = useRouter();

  const handleCardClick = useCallback(
    (eventId: string) => {
      router.push(`/event/${eventId}`);
    },
    [router]
  );

  const handleChangeAddressInput = useCallback((e) => {
    setAddressValue(() => e.target.value);
  }, []);

  const handleSubmitAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    setUserAddress(() => addressValue);
  };

  const closeModal = () => {
    setModalVisible(() => false);
  };
  useEffect(() => {
    const storageValue = localStorage.getItem(USER_ADDRESS_KEY);
    if (storageValue) setUserAddress(() => JSON.parse(storageValue));
  }, []);

  useEffect(() => {
    if (userAddress) setStorage(USER_ADDRESS_KEY, userAddress);
  }, [userAddress]);

  useEffect(() => {
    if (!userAddress) {
      setModalVisible(() => true);
      return;
    }
    setModalVisible(() => false);

    dispatchEventList({
      location: userAddress,
      sort: 'expiredAt,desc',
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
        <div>{userAddress || ''}</div>
      </Button>
      <SortButtons width={230} buttonArr={buttonArr} buttonMargin={16} />
      <CardList flexType="column" padding={0} margin="10px 0 0 0">
        {eventList.length ? (
          eventList.map((data, idx) => (
            <EventCard
              onClick={() => handleCardClick(data.eventId)}
              key={data.eventId}
              eventData={data}
              idx={idx}
              marginHeight={10}
            />
          ))
        ) : (
          <CardContainer cardType="default" css={NoEventListCardCSS}>
            <Text size="large" bold color={styles.colors.background}>
              <strong>앗! 이벤트가 없어요~</strong>😅
            </Text>
          </CardContainer>
        )}
      </CardList>
      <Modal
        width={300}
        height={400}
        modalType="default"
        padding={24}
        visible={modalVisible}
        onClose={closeModal}
        clickAway={false}
      >
        <Input
          sizeType="small"
          placeholder="OO시 OO구 OO동으로 입력해주세요!"
          error={false}
          onChange={handleChangeAddressInput}
        />
        <Button onClick={handleSubmitAddress}>주소 등록하기</Button>
      </Modal>
    </MainContainer>
  );
};

export default MainPage;
