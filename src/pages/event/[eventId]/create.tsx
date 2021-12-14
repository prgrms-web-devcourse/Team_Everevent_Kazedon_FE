import {
  Button,
  HeaderText,
  MainContainer,
  Textarea,
  Upload,
} from '@components/atoms';
import { useReview } from '@contexts/review';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const TextAreaCSS = css`
  margin-bottom: 96px;
  resize: none;
`;

const SubmitButtonCSS = css`
  display: block;
  width: 312px;
  margin: 0 auto;
  margin-top: 24px;
`;
const ReviewCreatePage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const {
    review,
    dispatchChangeReviewContent,
    dispatchCreateReview,
    reviewError,
  } = useReview();
  const onChangeContent = useCallback(
    (e, value = undefined) => {
      const { name } = e.target;
      dispatchChangeReviewContent({ name, value: value ?? e.target.value });
    },
    [dispatchChangeReviewContent]
  );

  const handleSubmit = useCallback(
    ({ description, picture }) => {
      if (!description || !eventId) return;
      dispatchCreateReview({ eventId, description, picture });
      if (!reviewError.code) {
        router.push(`/event/${eventId}`);
      }
    },
    [dispatchCreateReview, router, eventId, reviewError]
  );

  return (
    <MainContainer paddingWidth={24} paddingHeight={96}>
      <HeaderText level={1} marginBottom={48}>
        리뷰 작성하기
      </HeaderText>
      <HeaderText level={2} marginBottom={16}>
        내용
      </HeaderText>
      <Textarea
        name="description"
        width={312}
        height={128}
        css={TextAreaCSS}
        onChange={onChangeContent}
      />
      <HeaderText level={2} marginBottom={16}>
        사진
      </HeaderText>
      <Upload uploadType="single" dispatchEvent={dispatchChangeReviewContent} />
      <Button
        onClick={() =>
          handleSubmit({
            description: review.description,
            picture: review.picture,
          })
        }
        css={SubmitButtonCSS}
      >
        리뷰 남기기
      </Button>
    </MainContainer>
  );
};

export default ReviewCreatePage;
