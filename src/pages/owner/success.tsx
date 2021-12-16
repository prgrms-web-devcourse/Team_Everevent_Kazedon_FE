import React from 'react';
import { MainContainer } from '@components/atoms';
import { Header, Success } from '@components/domains';
import { css } from '@emotion/react';

const SuccessCSS = css`
  margin-top: 178px;
`;

const UserChangeSuccessPage = () => {
  const SuccessProps = {
    successMessage: '전환이 완료되었습니다!',
    buttonText: '전환된 내 가게 보러가기',
  };
  // TODO: 가게 정보 API 연동 후 라우팅 처리할 예정입니다.
  const handleMove = () => {};

  return (
    <MainContainer>
      <Header isVisibleMenu={false} isVisiblePrev={false} />
      <Success css={SuccessCSS} text={SuccessProps} onClick={handleMove} />
    </MainContainer>
  );
};

export default UserChangeSuccessPage;
