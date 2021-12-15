import React from 'react';
import { MainContainer } from '@components/atoms';
import { Header, LoginForm } from '@components/domains';
import { css } from '@emotion/react';

const HeaderMarginBottm = css`
  margin-bottom: 54px;
`;

const LoginPage = () => {
  return (
    <MainContainer paddingWidth={27}>
      <Header isVisibleMenu={false} css={HeaderMarginBottm} />
      <LoginForm />
    </MainContainer>
  );
};

export default LoginPage;
