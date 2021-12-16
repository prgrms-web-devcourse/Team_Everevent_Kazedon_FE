import React from 'react';
import { CategoryList, ReviewCard } from '@components/domains';
import reviews from '@fixtures/reviews';

interface EventReviewProps {
  onHeaderOptionClick?: () => void;
}
const EventReview = ({ onHeaderOptionClick }: EventReviewProps) => {
  const review = reviews[0];
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
        reviewData={review}
      />
    </CategoryList>
  );
};

export default EventReview;
