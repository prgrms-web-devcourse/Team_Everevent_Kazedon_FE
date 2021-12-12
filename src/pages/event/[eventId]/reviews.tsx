import { MainContainer } from '@components/atoms';
import { CategoryList, Header } from '@components/domains';
import ReviewCard from '@components/domains/ReviewCard';
import { css } from '@emotion/react';
import reviews from 'fixtures/reviews';
import React from 'react';

const CategoryListCSS = css`
  margin-top: 20px;
`;

const ReviewDetailPage = () => {
  return (
    <MainContainer paddingWidth={24}>
      <Header />
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
        {reviews.map((review, id) => (
          <ReviewCard
            key={`${`${review}${id}`}`}
            cardType="default"
            reviewData={{ ...review, marketName: '오비맥주 광진점' }}
            marginHeight={8}
          />
        ))}
      </CategoryList>
    </MainContainer>
  );
};

export default ReviewDetailPage;
