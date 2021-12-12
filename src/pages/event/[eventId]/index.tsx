import { MainContainer } from '@components/atoms';
import { EventReview, Header } from '@components/domains';
import EventDescriptions from '@components/domains/EventDetail/EventDescriptions';
import EventDetailHeader from '@components/domains/EventDetail/EventDetailHeader';
import MarketDescriptions from '@components/domains/EventDetail/MarketDescriptions';
import { useEvent } from '@contexts/event';
import { EventDetail } from '@contexts/event/types';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { event, dispatchEvent, initializeEvent } = useEvent();
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
  }: EventDetail = event;

  useEffect(() => {
    dispatchEvent({ eventId });
    return () => initializeEvent();
  }, [dispatchEvent, initializeEvent, eventId]);

  return (
    <MainContainer paddingWidth={24}>
      <Header />
      <EventDetailHeader
        expiredAt={expiredAt as string}
        marketName={marketName}
        name={name}
        isLike={isLike as boolean}
        isFavorite={isFavorite}
        isParticipated={isParticipated}
      />
      <MarketDescriptions
        marketDescription={marketDescription}
        pictures={pictures}
      />
      <EventDescriptions eventDescription={eventDescription} />
      <EventReview />
    </MainContainer>
  );
};

export default EventDetailPage;
