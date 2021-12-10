import CardList from '@components/atoms/CardList';
import EventCard from '@components/domains/EventCard';
import Header from '@components/domains/Header';
import SortButtons, { buttonArrType } from '@components/domains/SortButtons';
import { useEvent } from '@contexts/eventList';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const MainPage: NextPage = () => {
  const { eventList, dispatchEventList, initailizeEventList } = useEvent();

  useEffect(() => {
    dispatchEventList();
    return () => initailizeEventList();
  }, [dispatchEventList, initailizeEventList]);

  /* eslint-disable no-console */
  const buttonArr = [
    ['추천순', () => console.log('추천순')],
    ['등록순', () => console.log('등록순')],
    ['마감순', () => console.log('마감순')],
    ['좋아요순', () => console.log('좋아요순')],
  ] as buttonArrType[];
  return (
    <div css={{ width: '375px' }}>
      <Header />
      <SortButtons width={230} buttonArr={buttonArr} buttonMargin={16} />
      <CardList flexType="column" width={375} padding={0} margin={0}>
        {eventList.map((data, idx) => (
          <EventCard
            key={data.eventId}
            eventData={data}
            idx={idx}
            marginHeight={10}
          />
        ))}
      </CardList>
    </div>
  );
};

export default MainPage;
