import { CardList, HeaderText, MainContainer } from '@components/atoms';
import { Header, ReviewCard } from '@components/domains';
import { useUserHistory } from '@contexts/userHistory';
import styled from '@emotion/styled';
import { marginTop } from '@utils/computed';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';

const CounterBox = styled.section`
  margin-top: 40px;
`;
const UserDetailPage = () => {
  const router = useRouter();
  const { userId: memberId } = router.query;
  const { userReviewList, dispatchUserReviews } = useUserHistory();

  useEffect(() => {
    if (!memberId) return;
    dispatchUserReviews(memberId);
  }, [dispatchUserReviews, memberId]);

  return (
    <MainContainer>
      <Header isVisibleMenu isVisiblePrev />
      <HeaderText level={1} bold block css={marginTop(42)}>
        {memberId}
      </HeaderText>
      <CounterBox />
      <CardList box flexType="default" width={320} padding={0} margin={0}>
        {userReviewList.map((reviewData) => (
          <ReviewCard
            key={reviewData.marketName + reviewData.reviewId}
            cardType="box"
            reviewData={{
              reviewId: reviewData.reviewId,
              memberId: Number(memberId),
              marketName: reviewData.marketName,
              pictureUrl: reviewData.pictureUrl,
              description: reviewData.description,
            }}
            marginWidth={8}
            marginHeight={8}
          />
        ))}
      </CardList>
    </MainContainer>
  );
};

export default UserDetailPage;
