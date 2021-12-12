import React from 'react';
import styled from '@emotion/styled';
import HeaderText from '@components/atoms/HeaderText';
import Input from '@components/atoms/Input';
import Button from '@components/atoms/Button';
import useForm from '@hooks/useForm';

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
  padding-left: 10%;
`;

type Data = {
  email?: String;
  password?: String;
  passwordCheck?: String;
  nickname?: String;
};

const RegisterForm = () => {
  const { handleChange, handleSubmit } = useForm<Data>({
    initialValues: {
      email: '',
      password: '',
      passwordCheck: '',
      nickname: '',
    },
    onSubmit: (values) => {
      // TODO: 현재 간단한 로직만 구현하였으므로 콘솔로 처리한다.
      /* eslint-disable no-console */
      console.log(values);
    },
    validate: ({ email, password, passwordCheck, nickname }) => {
      const errors: Data = {};
      if (!email) errors.email = '이메일을 입력해주세요.';
      if (!password) errors.password = '비밀번호를 입력해주세요.';
      if (!passwordCheck)
        errors.passwordCheck = '비밀번호 확인을 입력해주세요.';
      if (!nickname) errors.nickname = '닉네임을 입력해주세요.';
      return errors;
    },
  });

  return (
    <RegisterFormContainer>
      <HeaderText level={1}>에브리벤트 가입하기</HeaderText>
      <InputWrapper>
        <Input
          sizeType="small"
          placeholder="이메일"
          name="email"
          onChange={handleChange}
          error={false}
        />
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
        <Input
          sizeType="small"
          placeholder="비밀번호"
          name="password"
          onChange={handleChange}
          error={false}
        />
        <Input
          sizeType="small"
          placeholder="비밀번호 확인"
          name="passwordCheck"
          onChange={handleChange}
          error={false}
        />
        <Input
          sizeType="small"
          placeholder="닉네임"
          name="nickname"
          onChange={handleChange}
          error={false}
        />
      </InputWrapper>
      <Button onClick={handleSubmit}>회원가입</Button>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
