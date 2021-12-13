import React from 'react';
import styled from '@emotion/styled';
import { Button, Input, HeaderText, Text } from '@components/atoms';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import { onRegisterCheck } from '@axios/user';

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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  margin-top: 19px;
`;

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 32px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

type Data = {
  email?: string;
  password?: string;
  passwordCheck?: string;
  nickname?: string;
};

const RegisterForm = () => {
  const { values, errors, setErrors, handleChange, handleSubmit } =
    useForm<Data>({
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

  const handleCheck = async () => {
    // API value.email
    if (values.email === '') {
      const newErrors = { email: '이메일을 입력해주세요' };

      setErrors(newErrors);
      return;
    }

    const checkInfo = {
      type: 'email',
      value: values.email,
    };

    const res = await onRegisterCheck(checkInfo);
    if (res.error.code) {
      const newErrors = { email: '이메일이 중복됩니다.' };
      setErrors(newErrors);
    } else {
      const newErrors = { email: '사용가능한 이메일 입니다.' };
      setErrors(newErrors);
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
          onChange={handleChange}
          error={false}
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
          onClick={handleCheck}
          bold={false}
        >
          이메일 중복 체크
        </Button>
      </EmailWrapper>
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
      </InputWrapper>
      <NicknameWrapper>
        <Input
          sizeType="small"
          placeholder="닉네임"
          name="nickname"
          onChange={handleChange}
          error={false}
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
      <ButtonWrapper>
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
      </ButtonWrapper>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
