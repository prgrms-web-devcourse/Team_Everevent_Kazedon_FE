import { Button, HeaderText, MainContainer, Textarea } from '@components/atoms';
import { css } from '@emotion/react';
import React from 'react';

const TextAreaCSS = css`
  margin-bottom: 96px;
  resize: none;
`;
const ReviewCreatePage = () => {
  return (
    <MainContainer paddingWidth={24} paddingHeight={96}>
      <HeaderText level={1} marginBottom={48}>
        리뷰 작성하기
      </HeaderText>
      <HeaderText level={2} marginBottom={16}>
        내용
      </HeaderText>
      <Textarea name="description" width={312} height={128} css={TextAreaCSS} />
      <HeaderText level={2} marginBottom={16}>
        사진
      </HeaderText>
      <Button
        buttonType="primary"
        width={88}
        height={40}
        border
        reversal
        borderRadius={20}
      >
        + 올리기
      </Button>
    </MainContainer>
  );
};

export default ReviewCreatePage;
