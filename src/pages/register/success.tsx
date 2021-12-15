import { MainContainer } from '@components/atoms';
import { Header, Success } from '@components/domains';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React from 'react';

const marginTop = css`
  margin-top: 176px;
`;

const RegisterSuccessPage = () => {
  const PropsText = {
    successMessage: '가입이 완료됐습니다!',
    buttonText: '로그인 하러 가기',
  };

  const router = useRouter();
  const handleMove = () => {
    router.push('/login');
  };

  return (
    <MainContainer>
      <Header isVisibleMenu={false} isVisiblePrev={false} />
      <Success css={marginTop} text={PropsText} onClick={handleMove} />
    </MainContainer>
  );
};

export default RegisterSuccessPage;
