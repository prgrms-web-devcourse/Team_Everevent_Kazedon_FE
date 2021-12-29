import {
  CardContainer,
  CardList,
  HeaderText,
  MainContainer,
} from '@components/atoms';
import { Header, ReviewCard } from '@components/domains';
import { useUserHistory } from '@contexts/userHistory';
import styled from '@emotion/styled';
import { marginTop } from '@utils/computed';
import getConvertedDate from '@utils/date';
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

  const userReviews = [
    {
      reviewId: 1,
      description:
        '회덮밥이 너무나 맛있었어요~ 너무나 맛난 저녁에다 맥주 공짜로 먹어서 좋았어요!',
      memberNickname: 'JengYoungTest2',
      memberId: 0,
      pictureUrls: ['https://picsum.photos/200'],
      createdAt: getConvertedDate(new Date()),
    },
    {
      reviewId: 1,
      description:
        '회덮밥이 너무나 맛있었어요~ 너무나 맛난 저녁에다 맥주 공짜로 먹어서 좋았어요!',
      memberNickname: 'JengYoungTest2',
      memberId: 0,
      pictureUrls: ['https://picsum.photos/200'],
      createdAt: getConvertedDate(new Date()),
    },
    {
      reviewId: 1,
      description:
        '회덮밥이 너무나 맛있었어요~ 너무나 맛난 저녁에다 맥주 공짜로 먹어서 좋았어요!',
      memberNickname: 'JengYoungTest2',
      memberId: 0,
      pictureUrls: ['https://picsum.photos/200'],
      createdAt: getConvertedDate(new Date()),
    },
  ];

  return (
    <MainContainer>
      <Header isVisibleMenu isVisiblePrev />
      <HeaderText level={1} bold block css={marginTop(42)}>
        {memberId}
      </HeaderText>
      <CounterBox />
      <CardList box flexType="default" width={320} padding={0} margin={0}>
        {userReviews.map((reviewData) => (
          <ReviewCard
            cardType="box"
            reviewData={reviewData}
            marginWidth={8}
            marginHeight={8}
          />
        ))}
      </CardList>
    </MainContainer>
  );
};

export default UserDetailPage;
