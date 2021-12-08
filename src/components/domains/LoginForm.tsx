import React from 'react';
import styled from '@emotion/styled';
import HeaderText from '@components/atoms/HeaderText';
import Input from '@components/atoms/Input';
import Button from '@components/atoms/Button';

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 120px;
  margin-top: 18px;
  margin-bottom: 34px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LoginForm = () => {
  return (
    <LoginFormContainer>
      <HeaderText level={1}>에브리벤트에 함께하세요!</HeaderText>
      <InputWrapper>
        <Input sizeType="small" placeholder="이메일" error={false} />
        <Input sizeType="small" placeholder="비밀번호" error={false} />
      </InputWrapper>
      <ButtonWrapper>
        <Button
          buttonType="primary"
          width={280}
          height={48}
          borderRadius="15px"
          bold
        >
          로그인
        </Button>
        <Button
          buttonType="primary"
          width={280}
          height={48}
          borderRadius="15px"
          reversal
          border
          bold
        >
          회원가입
        </Button>
      </ButtonWrapper>
    </LoginFormContainer>
  );
};

export default LoginForm;
