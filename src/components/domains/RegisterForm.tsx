import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, HeaderText, Text } from '@components/atoms';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import { onRegisterCheck } from '@axios/user';
import { text } from '@utils/constantUser';

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
  width: 280px;
  height: 113px;
  margin-top: 9px;
`;

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 134px;
  margin-top: 19px;
`;

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  margin: 32px 0;
`;

interface Data {
  email?: string;
  password?: string;
  passwordCheck?: string;
  nickname?: string;
}

const RegisterForm = () => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm<Data>({
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
      const newErrors: Data = {};
      if (!email) newErrors.email = '이메일을 입력해주세요.';
      if (!password) newErrors.password = '비밀번호를 입력해주세요.';
      if (!passwordCheck)
        newErrors.passwordCheck = '비밀번호 확인을 입력해주세요.';
      if (!nickname) newErrors.nickname = '닉네임을 입력해주세요.';
      return newErrors;
    },
  });

  const onValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    handleChange(e);

    switch (name) {
      case text.email: {
        if (!text.emailReg.test(value || '')) setEmailError(true);
        else setEmailError(false);
        return;
      }
      case text.password: {
        if (!text.passwordReg.test(value || '')) setPasswordError(true);
        else setPasswordError(false);
        return;
      }
      case text.passwordCheck: {
        if (values.password === value) setPasswordCheckError(false);
        else setPasswordCheckError(true);
        return;
      }
      case text.nickname: {
        if (!text.nicknameReg.test(value || '')) setNicknameError(true);
        else setNicknameError(false);
        return;
      }
      default: {
        return e;
      }
    }
  };

  return (
    <RegisterFormContainer>
      <HeaderText level={1}>에브리벤트 가입하기</HeaderText>
      <EmailWrapper>
        <Input
          sizeType="small"
          placeholder="이메일"
          name="email"
          onChange={onValidate}
          error={emailError}
        />
        {errors.email && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.email}
          </Text>
        )}
        <Button
          width={144}
          height={40}
          borderRadius="20px"
          reversal
          border
          onClick={handleSubmit}
          bold={false}
        >
          이메일 중복 체크
        </Button>
      </EmailWrapper>
      <PasswordWrapper>
        <Input
          sizeType="small"
          placeholder="비밀번호"
          type="password"
          name="password"
          onChange={onValidate}
          error={passwordError}
        />
        <Input
          sizeType="small"
          placeholder="비밀번호 확인"
          type="password"
          name="passwordCheck"
          onChange={onValidate}
          error={passwordCheckError}
        />
        {errors.password && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.password}
          </Text>
        )}
      </PasswordWrapper>
      <NicknameWrapper>
        <Input
          sizeType="small"
          placeholder="닉네임"
          name="nickname"
          onChange={onValidate}
          error={nicknameError}
        />
        {errors.nickname && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.nickname}
          </Text>
        )}
      </NicknameWrapper>
      <Button
        buttonType="primary"
        width={280}
        height={48}
        borderRadius="15px"
        onClick={handleSubmit}
        bold
      >
        회원가입
      </Button>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
