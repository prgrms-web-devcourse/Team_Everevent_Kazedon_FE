import { CardList, HeaderText, MainContainer } from '@components/atoms';
import { Header, ReviewCard } from '@components/domains';
import StateCounter from '@components/domains/StateCounter';
import { useUserHistory } from '@contexts/userHistory';
import styled from '@emotion/styled';
import useLoginCheck from '@hooks/useLoginCheck';
import { marginTop } from '@utils/computed';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';

const CounterBox = styled.section`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 50px;
`;
const UserDetailPage = () => {
  const router = useRouter();
  const { userId: memberId } = router.query;
  const { userReviewList, userReviewListOptions, dispatchUserReviews } =
    useUserHistory();

  const { isFirst, handleCheck } = useLoginCheck();

  useEffect(() => {
    if (!isFirst) {
      handleCheck(false);
    }
  }, [isFirst, handleCheck]);

  useEffect(() => {
    if (!memberId) return;
    dispatchUserReviews(memberId);
  }, [dispatchUserReviews, memberId]);

  return (
    <MainContainer>
      <Header isVisibleMenu isVisiblePrev />
      <HeaderText level={1} css={marginTop(42)}>
        {memberId}
      </HeaderText>
      <CounterBox>
        <StateCounter
          name="참여 수"
          count={userReviewListOptions.reviewerEventCount}
        />
        <StateCounter
          name="작성 리뷰 수"
          count={userReviewListOptions.reviewerReviewCount}
        />
      </CounterBox>
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
