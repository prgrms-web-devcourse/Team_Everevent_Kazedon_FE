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
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { CardContainer, HeaderText, Modal, Text } from '@components/atoms';
import { setStorage } from '@utils/storage';
import { USER_ADDRESS_KEY } from '@utils/constantUser';
import useLoginCheck from '@hooks/useLoginCheck';
import PostCode from '@components/domains/PostCode';
import styled from '@emotion/styled';

const AddressButtonCSS = css`
  margin-top: 60px;
  margin-bottom: 20px;
  color: ${styles.colors.primary};
`;

const AddressSubmitButtonCSS = css`
  left: 0;
  width: 48%;
`;

const AddressResearchButtonCSS = css`
  ${AddressSubmitButtonCSS}
  right: 0;
  left: auto;
`;

const NoEventListCardCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;

  strong {
    font-weight: 700;
  }
`;

const AddressButtonBox = styled.div`
  position: absolute;
  bottom: 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;
const StyledAddressInfo = styled.address`
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  text-decoration: normal;
`;

const MainPage: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPostCode, setShowPostCode] = useState(true);

  const { isFirst, handleCheck } = useLoginCheck();

  useEffect(() => {
    if (!isFirst) {
      handleCheck(false);
    }
  }, [isFirst, handleCheck]);

  /* eslint-disable-next-line */
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [addressValue, setAddressValue] = useState<string>('');
  const {
    eventList,
    eventListOptions,
    dispatchEventList,
    initializeEventList,
  } = useEvent();

  const [sortState, setSortState] = useState<SortOrder>('desc');
  const [sortTypeState, setSortTypeState] = useState<SortType>('createdAt');

  const router = useRouter();

  const handleCardClick = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  const handleChangeAddressInput = useCallback((e) => {
    setAddressValue(() => e);
    // setAddressValue(() => e.target.value);
  }, []);

  const handleSubmitAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    setUserAddress(() => addressValue);
    setModalVisible(() => false);
  };

  const handleReSearchAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddressValue(() => '');
    setShowPostCode(() => true);
  };

  const closeModal = () => {
    setModalVisible(() => false);
  };

  useEffect(() => {
    const storageValue = localStorage.getItem(USER_ADDRESS_KEY);
    if (storageValue) setUserAddress(() => JSON.parse(storageValue));
  }, []);

  useEffect(() => {
    initializeEventList();
    if (userAddress) setStorage(USER_ADDRESS_KEY, userAddress);
  }, [userAddress, initializeEventList]);

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

  useEffect(() => {
    return () => {
      setUserAddress(() => null);
      setModalVisible(() => false);
    };
  }, []);

  const buttonNames = {
    createdAt: '최신 순',
    likeCount: '좋아요 순',
    expiredAt: '종료일 순',
  } as const;
  const buttonArr = [
    [buttonNames.createdAt, () => setSortTypeState(() => 'createdAt')],
    [buttonNames.likeCount, () => setSortTypeState(() => 'likeCount')],
    [buttonNames.expiredAt, () => setSortTypeState(() => 'expiredAt')],
  ] as ButtonArrType[];

  const handleSortAscend = useCallback(() => {
    setSortState(() => 'asc');
  }, []);
  const handleSortDescend = useCallback(() => {
    setSortState(() => 'desc');
  }, []);

  /* intersection observer */
  // TODO: 추후 커스텀 훅으로 리팩토링을 한다.
  const observerTarget = useRef<HTMLDivElement>(null);
  const nowPageCnt = useRef<number>(0);
  const getMoreList = useCallback(
    (page) => {
      dispatchEventList({
        location: userAddress,
        sort: `${sortTypeState},${sortState}`,
        page,
        size: 10,
      });
    },
    [userAddress, sortTypeState, sortState, dispatchEventList]
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    let observerTargetCurrent: HTMLDivElement | undefined;
    if (observerTarget.current) {
      observerTargetCurrent = observerTarget.current;
    }

    const cb = async (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        nowPageCnt.current += 1;
        getMoreList(nowPageCnt.current);
      }
    };
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 200px 0px',
      threshold: 1,
    };
    if (
      eventListOptions.totalPages &&
      !eventListOptions.last &&
      observerTargetCurrent
    ) {
      observer = new IntersectionObserver(cb, observerOptions);
      observer.observe(observerTargetCurrent);
    }

    return () => {
      if (observer && observerTargetCurrent) observer.disconnect();
    };
  }, [observerTarget, userAddress, eventListOptions, getMoreList]);

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
          <div>{userAddress || '주소를 입력해주세요!'}</div>
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
          {eventList.map((data, idx) => (
            <EventCard
              key={data.eventId}
              eventData={data}
              idx={idx}
              marginHeight={10}
              onClick={() => handleCardClick(data.eventId)}
            />
          ))}
          {!eventList.length && (
            <CardContainer cardType="default" css={NoEventListCardCSS}>
              <Text size="large" bold color={styles.colors.background}>
                <strong>앗! 이벤트가 없어요~</strong>😅
              </Text>
            </CardContainer>
          )}
        </CardList>
        <div ref={observerTarget} />
      </MainContainer>
      <Modal
        width={300}
        height={addressValue ? 280 : 600}
        modalType="default"
        padding={24}
        visible={modalVisible}
        onClose={closeModal}
        clickAway
      >
        <HeaderText level={1} marginBottom={20}>
          주소 등록
        </HeaderText>
        <HeaderText level={2} marginBottom={16}>
          어떤 곳의 이벤트를 찾고 싶나요?
        </HeaderText>
        {addressValue && (
          <StyledAddressInfo>
            <Text bold block size="large">
              {addressValue}
            </Text>
            에서의 이벤트를 찾으시겠어요?
          </StyledAddressInfo>
        )}
        {modalVisible && showPostCode && (
          <PostCode
            autoClose
            onChangeAddressInput={handleChangeAddressInput}
            setShowPostCode={setShowPostCode}
            setModalVisible={setModalVisible}
          />
        )}
        {addressValue && (
          <AddressButtonBox>
            <Button onClick={handleSubmitAddress} css={AddressSubmitButtonCSS}>
              주소 등록하기
            </Button>
            <Button
              onClick={handleReSearchAddress}
              css={AddressResearchButtonCSS}
            >
              주소 다시 찾기
            </Button>
          </AddressButtonBox>
        )}
      </Modal>
    </>
  );
};

export default MainPage;
