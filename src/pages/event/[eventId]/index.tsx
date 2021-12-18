import { CardContainer, MainContainer, Text } from '@components/atoms';
import { EventReview, Header } from '@components/domains';
import EventDescriptions from '@components/domains/EventDetail/EventDescriptions';
import EventDetailHeader from '@components/domains/EventDetail/EventDetailHeader';
import MarketDescriptions from '@components/domains/EventDetail/MarketDescriptions';
import { useEvent } from '@contexts/event';
import { useReview } from '@contexts/review';
import { css } from '@emotion/react';
import styles from '@styles/index';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

const NoReviewCardCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${styles.colors.background};

  strong {
    font-weight: 700;
  }
`;

const marginBottomCSS = css`
  margin-bottom: 8px;
`;

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { event, dispatchEvent, initializeEvent } = useEvent();
  const { reviewList, dispatchGetReviewList } = useReview();

  const handleHeaderOptionClick = useCallback(async () => {
    router.push(`/event/${eventId}/reviews`);
  }, [router, eventId]);

  useEffect(() => {
    dispatchEvent({ eventId });
    dispatchGetReviewList({
      eventId,
      sort: 'createdAt,desc',
      page: 0,
      size: 1,
    });
    return () => initializeEvent();
  }, [dispatchEvent, initializeEvent, eventId, dispatchGetReviewList]);

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
      {reviewList.length ? (
        <EventReview
          reviewData={reviewList[0] ?? []}
          onHeaderOptionClick={handleHeaderOptionClick}
        />
      ) : (
        <CardContainer cardType="default" padding={24} css={NoReviewCardCSS}>
          <div>
            <Text paragraph size="medium" css={marginBottomCSS}>
              <strong>앗! 리뷰가 없어요</strong> 😅
            </Text>
            <Text paragraph size="small">
              리뷰를 통해 가게 사장님께
            </Text>
            <Text paragraph size="small">
              <Text>
                <Text underline>
                  <strong>응원의 한 마디</strong>
                </Text>
              </Text>{' '}
              건네보는 건 어떨까요~? 🎉
            </Text>
          </div>
        </CardContainer>
      )}
    </MainContainer>
  );
};

export default EventDetailPage;
