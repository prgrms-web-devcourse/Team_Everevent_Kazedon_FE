import { MainContainer } from '@components/atoms';
import { EventReview, Header } from '@components/domains';
import EventDescriptions from '@components/domains/EventDetail/EventDescriptions';
import EventDetailHeader from '@components/domains/EventDetail/EventDetailHeader';
import MarketDescriptions from '@components/domains/EventDetail/MarketDescriptions';
import { useEvent } from '@contexts/event';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { event, dispatchEvent, initializeEvent } = useEvent();

  const handleHeaderOptionClick = useCallback(async () => {
    router.push(`event/${eventId}/reviews`);
  }, [router, eventId]);

  useEffect(() => {
    dispatchEvent({ eventId });
    return () => initializeEvent();
  }, [dispatchEvent, initializeEvent, eventId]);

  return (
    <MainContainer paddingWidth={24}>
      <Header />
      <EventDetailHeader
        expiredAt={event.expriedAt as string}
        marketName={event.marketName}
        name={event.eventName}
        isLike={event.like as boolean}
        isFavorite={event.favorite}
        isParticipated={event.participated}
        isCompleted={event.completed}
      />
      <MarketDescriptions
        marketDescription={event.marketDescription}
        pictures={event.pictures}
      />
      <EventDescriptions eventDescription={event.eventDescription} />
      <EventReview onHeaderOptionClick={handleHeaderOptionClick} />
    </MainContainer>
  );
};

export default EventDetailPage;
