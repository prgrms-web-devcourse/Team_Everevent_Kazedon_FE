import React from 'react';
import styled from '@emotion/styled';
import HeaderText from '@components/atoms/HeaderText';
import Input from '@components/atoms/Input';
import Button from '@components/atoms/Button';

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  padding-left: 14%;
`;

const RegisterForm = () => {
  return (
    <RegisterFormContainer>
      <HeaderText level={1}>에브리벤트 가입하기</HeaderText>
      <InputWrapper>
        <Input sizeType="small" placeholder="이메일" error={false} />
      </InputWrapper>
      <ButtonWrapper>
        <Button
          width={144}
          height={40}
          borderRadius="30px"
          reversal
          border
          bold={false}
        >
          이메일 중복 체크
        </Button>
      </ButtonWrapper>
      <InputWrapper>
        <Input sizeType="small" placeholder="비밀번호" error={false} />
        <Input sizeType="small" placeholder="비밀번호 확인" error={false} />
        <Input sizeType="small" placeholder="닉네임" error={false} />
      </InputWrapper>
      <Button>회원가입</Button>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
