import React from 'react';
import { CategoryList, ReviewCard } from '@components/domains';
import { Review } from '@contexts/review/types';

interface EventReviewProps {
  reviewData: Review;
  onHeaderOptionClick?: () => void;
}
const EventReview = ({ reviewData, onHeaderOptionClick }: EventReviewProps) => {
  return (
    <CategoryList
      flexType="column"
      width="100%"
      padding={0}
      margin={0}
      categoryName="이벤트 리뷰"
      headerMarginBottom={16}
      headerLevel={2}
      onHeaderOptionClick={onHeaderOptionClick}
    >
      <ReviewCard
        cardType="default"
        bgColorName="default"
        padding={10}
        margin="10px 0"
        reviewData={reviewData}
      />
    </CategoryList>
  );
};

export default EventReview;
