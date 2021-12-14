import { HeaderText, MainContainer, Textarea } from '@components/atoms';
import Upload from '@components/atoms/Upload';
import { useReview } from '@contexts/review';
import { css } from '@emotion/react';
import React, { useCallback } from 'react';

const TextAreaCSS = css`
  margin-bottom: 96px;
  resize: none;
`;
const ReviewCreatePage = () => {
  const { dispatchChangeReviewContent } = useReview();
  const onChangeContent = useCallback(
    (e, value = undefined) => {
      const { name } = e.target;
      dispatchChangeReviewContent({ name, value: value ?? e.target.value });
    },
    [dispatchChangeReviewContent]
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
      <Upload
        uploadType="multiple"
        dispatchEvent={dispatchChangeReviewContent}
      />
    </MainContainer>
  );
};

export default ReviewCreatePage;
