import { Button, HeaderText, Text } from '@components/atoms';
import styled from '@emotion/styled';
import { marginBottom } from '@utils/computed';
import { useRouter } from 'next/router';
import React from 'react';

const StyledLoginInformContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 180px;
`;

export interface LoginInformContainerProps {
  requestType: string;
}
const LoginInformContainer = ({ requestType }: LoginInformContainerProps) => {
  const handleConfirmButton = () => {
    const router = useRouter();
    router.push('/login');
  };
  return (
    <StyledLoginInformContainer>
      <HeaderText level={2} marginBottom={16}>
        로그인해주세요!
      </HeaderText>
      <Text size="small" paragraph css={marginBottom(4)}>
        {requestType} 기능은 로그인한 유저만
      </Text>
      <Text size="small" paragraph css={marginBottom(16)}>
        이용할 수 있는 기능입니다 😃
      </Text>
      <Button onClick={handleConfirmButton}>로그인하기</Button>
    </StyledLoginInformContainer>
  );
};

export default LoginInformContainer;
