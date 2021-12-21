import React, { useContext, useEffect, useState } from 'react';
import { CardList } from '@components/atoms';
import { EventCard } from '@components/domains';
import { ShopEvent } from '@contexts/Shop/types';
import { ShopContext } from '@contexts/Shop';
import { useRouter } from 'next/router';

interface ShopEventsProps extends Partial<ShopEvent> {
  [index: string]: any;
}

const ShopEvents = ({ marketId }: ShopEventsProps) => {
  const { getShopEvents } = useContext(ShopContext);
  const [eventInfo, setEventInfo] = useState([]);

  const router = useRouter();

  const handleClick = (eventId: number) => {
    router.push(`/event/${eventId}`);
  };

  useEffect(() => {
    if (marketId) {
      getShopEvents(marketId).then((data: any) => {
        setEventInfo(data);
      });
    }
  }, [getShopEvents, marketId]);

  const defaultData = {
    like: true,
  };

  return (
    <CardList flexType="column" padding={0} margin="10px 0 0 0">
      {eventInfo.map((event: any, index: number) => (
        <EventCard
          onClick={() => handleClick(event.eventId)}
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
