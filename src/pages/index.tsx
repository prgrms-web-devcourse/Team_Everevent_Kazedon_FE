import Button from '@components/atoms/Button';
import CardList from '@components/atoms/CardList';
import MainContainer from '@components/atoms/MainContainer';
import EventCard from '@components/domains/EventCard';
import Header from '@components/domains/Header';
import SortButtons, {
  ButtonArrType,
  SortOrder,
  SortType,
} from '@components/domains/SortButtons';
import { useEvent } from '@contexts/event';
import { css } from '@emotion/react';
import styles from '@styles/index';
import type { NextPage } from 'next';
import React, { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import {
  CardContainer,
  HeaderText,
  Input,
  Modal,
  Text,
} from '@components/atoms';
import { setStorage } from '@utils/storage';
import { USER_ADDRESS_KEY } from '@utils/constantUser';

const AddressButtonCSS = css`
  margin-top: 60px;
  margin-bottom: 20px;
  color: ${styles.colors.primary};
`;

const AddressSubmitButtonCSS = css`
  position: absolute;
  bottom: 24px;
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
  const [sortState, setSortState] = useState<SortOrder>('desc');
  const [sortTypeState, setSortTypeState] = useState<SortType>('createdAt');
  const router = useRouter();

  const handleCardClick = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

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
      sort: `${sortTypeState},${sortState}`,
      page: 0,
      size: 10,
    });
    return () => initializeEventList();
  }, [
    userAddress,
    dispatchEventList,
    initializeEventList,
    sortState,
    sortTypeState,
  ]);

  const buttonArr = [
    ['좋아요 순', () => setSortTypeState(() => 'likeCount')],
    ['최신 순', () => setSortTypeState(() => 'createdAt')],
    ['종료일 순', () => setSortTypeState(() => 'expiredAt')],
  ] as ButtonArrType[];

  const handleSortAscend = useCallback(() => {
    setSortState(() => 'asc');
  }, []);
  const handleSortDescend = useCallback(() => {
    setSortState(() => 'desc');
  }, []);

  return (
    <>
      <MainContainer paddingWidth={24}>
        <Header isVisiblePrev={false} />
        <Button
          fontSize={styles.fontSize.large}
          reversal
          width="auto"
          padding={0}
          css={AddressButtonCSS}
          onClick={() => setModalVisible(() => true)}
        >
          <div>{userAddress || ''}</div>
        </Button>
        <SortButtons
          width="100%"
          buttonArr={buttonArr}
          buttonMargin={16}
          sortTypeState={sortTypeState}
          sortState={sortState}
          onSortAscend={handleSortAscend}
          onSortDescend={handleSortDescend}
        />
        <CardList flexType="column" padding={0} margin="10px 0 0 0">
          {eventList.length ? (
            eventList.map((data, idx) => (
              <EventCard
                key={data.eventId}
                eventData={data}
                idx={idx}
                marginHeight={10}
                onClick={() => handleCardClick(data.eventId)}
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
      </MainContainer>
      <Modal
        width={300}
        height={400}
        modalType="default"
        padding={24}
        visible={modalVisible}
        onClose={closeModal}
        clickAway={false}
      >
        <HeaderText level={1} marginBottom={20}>
          주소 등록
        </HeaderText>
        <HeaderText level={2} marginBottom={16}>
          어떤 곳의 이벤트를 찾고 싶나요 ?
        </HeaderText>
        <Input
          sizeType="small"
          placeholder="OO시 OO구 OO동으로 입력해주세요!"
          error={false}
          onChange={handleChangeAddressInput}
        />
        <Button onClick={handleSubmitAddress} css={AddressSubmitButtonCSS}>
          주소 등록하기
        </Button>
      </Modal>
    </>
  );
};

export default MainPage;
