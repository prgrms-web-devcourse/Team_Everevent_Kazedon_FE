import React from 'react';
import { MainContainer } from '@components/atoms';
import { Header, Success } from '@components/domains';
import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';

const SuccessCSS = css`
  margin-top: 178px;
`;

const UserChangeSuccessPage = () => {
  const router = useRouter();

  const SuccessProps = {
    successMessage: '전환이 완료되었습니다!',
    buttonText: '전환된 내 가게 보러가기',
  };

  const handleClick = () => {
    router.push('/shop');
  };

  return (
    <MainContainer>
      <Header isVisibleMenu={false} isVisiblePrev={false} />
      <Success css={SuccessCSS} text={SuccessProps} onClick={handleClick} />
    </MainContainer>
  );
};

export default UserChangeSuccessPage;
