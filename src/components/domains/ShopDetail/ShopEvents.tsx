import React from 'react';
import { CardList } from '@components/atoms';
import { EventCard } from '@components/domains';
import { ShopEvent } from '@contexts/Shop/types';

interface ShopEventsProps extends Partial<ShopEvent> {
  [index: string]: any;
}

// TODO: 각 이벤트 카드에 대한 라우팅 처리할 예정
const handleClick = () => {};

const ShopEvents = ({ events }: ShopEventsProps) => {
  const defaultData = {
    isLike: true,
  };

  return (
    <CardList flexType="column" padding={0} margin="10px 0 0 0">
      {events.map((event: any, index: number) => (
        <EventCard
          onClick={() => handleClick()}
          key={`${`${event}${index}`}`}
          eventData={{ ...defaultData, ...event }}
          idx={index}
          marginHeight={10}
        />
      ))}
    </CardList>
  );
};

export default ShopEvents;
