import { MainContainer } from '@components/atoms';
import { CategoryList, EventDetailHeader, Header } from '@components/domains';
import ReviewCard, { reviewDataTypes } from '@components/domains/ReviewCard';
import { EventDetail } from '@contexts/event/types';
import { css } from '@emotion/react';
import event from 'fixtures/event';
import reviews from 'fixtures/reviews';
import React, { useEffect, useRef, useState } from 'react';

const CategoryListCSS = css`
  margin-top: 20px;
`;

const ReviewDetailPage = () => {
  const {
    expiredAt,
    marketName,
    name,
    isLike,
    isFavorite,
    isParticipated,
  }: EventDetail = event;

  const lastReviewId = useRef<number>(0);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [nowReviews, setNowReviews] = useState<any[]>(reviews);

  useEffect(() => {
    let observerRef: HTMLDivElement | null = null;
    if (observerTarget.current) {
      observerRef = observerTarget.current;
    }
    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        // TODO: lastReviewId가 현재 마지막 리뷰와 같다면 early return한다.
        if (lastReviewId.current > 3) {
          observer.unobserve(entry.target);
        }

        if (entry.isIntersecting) {
          // TODO: API 요청에 페이지를 담아 전달한다. cnt를 업데이트한다. (실제로는 마지막 리뷰 id)
          setNowReviews((state) => [...state, ...reviews]);
          lastReviewId.current += 1;

          // TODO: 만약 요청을 했을 때 더이상 추가할 수 없다면 observe를 추가하지 않는다.
          if (lastReviewId.current > 3) {
            observer.unobserve(entry.target);
          }
          // if (lastReviewId.current === lastCnt + 1) observer.observe(entry.target);
        }
      });
    };
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 200px 0px',
      threshold: 1,
    };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observer.observe(observerRef as HTMLElement);
    return () => {
      observer.unobserve(observerRef as HTMLElement);
    };
    // TODO: 현재 scrollCnt가 늘어날 때마다 observer을 만들고 해제할 수 있도록 한다.
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [lastReviewId.current]);

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
        {nowReviews.map((review: reviewDataTypes, id: number) => (
          <ReviewCard
            key={`${`${review}${id}`}`}
            cardType="default"
            reviewData={{ ...review, marketName: '오비맥주 광진점' }}
            marginHeight={8}
          />
        ))}
      </CategoryList>
      <div ref={observerTarget} />
    </MainContainer>
  );
};

export default ReviewDetailPage;
