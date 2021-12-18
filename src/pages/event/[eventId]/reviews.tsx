import { MainContainer } from '@components/atoms';
import { CategoryList, EventDetailHeader, Header } from '@components/domains';
import ReviewCard from '@components/domains/ReviewCard';
import { useEvent } from '@contexts/event';
import { useReview } from '@contexts/review';
import { Review } from '@contexts/review/types';
import { css } from '@emotion/react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

const CategoryListCSS = css`
  margin-top: 20px;
`;

const ReviewDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { event, dispatchEvent, initializeEvent } = useEvent();
  const { reviewList, dispatchGetReviewList } = useReview();

  useEffect(() => {
    dispatchEvent({ eventId });
    dispatchGetReviewList({
      eventId,
      sort: 'createdAt,desc',
      page: 0,
      size: 8,
    });
    return () => initializeEvent();
  }, [dispatchEvent, initializeEvent, eventId, dispatchGetReviewList]);

  const lastId = useRef<number>(0);

  const observerCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      // TODO: lastReviewId가 현재 마지막 리뷰와 같다면 early return한다.
      if (lastId.current > 3) {
        observer.unobserve(entry.target);
      }

      if (entry.isIntersecting) {
        // TODO: API 요청에 페이지를 담아 전달한다. cnt를 업데이트한다. (실제로는 마지막 리뷰 id)
        // setNowReviews((state) => [...state, ...reviews]);
        lastId.current += 1;

        // TODO: 만약 요청을 했을 때 더이상 추가할 수 없다면 observe를 추가하지 않는다.
        if (lastId.current > 3) {
          observer.unobserve(entry.target);
        }
      }
    });
  };
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 200px 0px',
    threshold: 1,
  };
  const { observerTarget } = useIntersectionObserver({
    lastIdCurrent: lastId.current,
    observerCallback,
    observerOptions,
  });

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
      <CategoryList
        headerLevel={2}
        headerMarginBottom={16}
        categoryName="이벤트 리뷰"
        padding={0}
        margin={0}
        flexType="column"
        width="auto"
        css={CategoryListCSS}
      >
        {reviewList.map((review: Review, id: number) => (
          <ReviewCard
            key={`${`${review}${id}`}`}
            cardType="default"
            reviewData={review}
            marginHeight={8}
          />
        ))}
      </CategoryList>
      <div ref={observerTarget} />
    </MainContainer>
  );
};

export default ReviewDetailPage;
