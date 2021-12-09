import CardList from '@components/atoms/CardList';
import EventCard from '@components/domains/EventCard';
import Header from '@components/domains/Header';
import SortButtons, { buttonArrType } from '@components/domains/SortButtons';
import eventsData from 'fixtures/events';
import type { NextPage } from 'next';

const MainPage: NextPage = () => {
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
        {eventsData.map((data, idx) => (
          <EventCard eventData={data} idx={idx} />
        ))}
      </CardList>
    </div>
  );
};

export default MainPage;
