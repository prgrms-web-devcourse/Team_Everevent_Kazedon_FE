import React from 'react';
import RegisterForm from '@components/domains/RegisterForm';
import { MainContainer } from '@components/atoms';
import { Header } from '@components/domains';
import { css } from '@emotion/react';

const HeaderMarginBottm = css`
  margin-bottom: 54px;
`;

const RegisterPage = () => {
  return (
    <MainContainer>
      <Header isVisibleMenu={false} css={HeaderMarginBottm} />
      <RegisterForm />
    </MainContainer>
  );
};

export default RegisterPage;
