import { MainContainer } from '@components/atoms';
import { Header } from '@components/domains';
import EventDescriptions from '@components/domains/EventDetail/EventDescriptions';
import EventDetailHeader from '@components/domains/EventDetail/EventDetailHeader';
import MarketDescriptions from '@components/domains/EventDetail/MarketDescriptions';
import { Event } from '@contexts/event/types';
import eventData from 'fixtures/event';
import React from 'react';

const EventDetailPage = () => {
  const {
    name,
    expiredAt,
    marketName,
    marketDescription,
    eventDescription,
    isLike,
    isFavorite,
    pictures,
    isParticipated,
  } = eventData as Event;
  return (
    <MainContainer paddingWidth={24}>
      <Header />
      <EventDetailHeader
        expiredAt={expiredAt}
        marketName={marketName}
        name={name}
        isLike={isLike}
        isFavorite={isFavorite}
        isParticipated={isParticipated}
      />
      <MarketDescriptions
        marketDescription={marketDescription}
        pictures={pictures}
      />
      <EventDescriptions eventDescription={eventDescription} />
    </MainContainer>
  );
};

export default EventDetailPage;
