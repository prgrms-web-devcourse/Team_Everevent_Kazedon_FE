import React, { useContext, useEffect, useState } from 'react';
import { CardList } from '@components/atoms';
import { EventCard, Pagination } from '@components/domains';
import { ShopEvent } from '@contexts/Shop/types';
import { ShopContext } from '@contexts/Shop';
import { useRouter } from 'next/router';

interface ShopEventsProps extends Partial<ShopEvent> {
  [index: string]: any;
}

const ShopEvents = ({ marketId }: ShopEventsProps) => {
  const { getShopEvents } = useContext(ShopContext);
  const [eventInfo, setEventInfo] = useState([]);
  const eventCount: number = 3;
  const [currentPage, setCurrentPage] = useState(1);

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

  const showCurrentEvents = () => {
    const endIndex: number = currentPage * eventCount;
    const startIndex: number = endIndex - eventCount;

    return eventInfo.slice(startIndex, endIndex);
  };

  return (
    <>
      <CardList flexType="column" padding={0} margin="10px 0 0 0">
        {showCurrentEvents().map((event: any, index: number) => (
          <EventCard
            onClick={() => handleClick(event.eventId)}
            key={`${`${event}${index}`}`}
            eventData={event}
            idx={index}
            marginHeight={10}
          />
        ))}
      </CardList>
      <Pagination
        eventCount={eventCount}
        totalEventCount={eventInfo.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </>
  );
};

export default ShopEvents;
