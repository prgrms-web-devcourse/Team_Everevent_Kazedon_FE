import React, { useReducer, useState } from 'react';
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

interface ErrorState {
  email: boolean;
  password: boolean;
  passwordCheck: boolean;
  nickname: boolean;
}

interface Action {
  name: string;
  value: string;
  password?: string;
}

const reducer = (state: ErrorState, action: Action) => {
  switch (action.name) {
    case text.email: {
      if (text.emailReg.test(action.value)) return { ...state, email: false };
      return { ...state, email: true };
    }
    case text.password: {
      if (text.passwordReg.test(action.value))
        return { ...state, password: false };
      return { ...state, password: true };
    }
    case text.passwordCheck: {
      if (action.password === action.value)
        return { ...state, passwordCheck: false };
      return { ...state, passwordCheck: true };
    }
    case text.nickname: {
      if (text.nicknameReg.test(action.value))
        return { ...state, nickname: false };
      return { ...state, nickname: true };
    }
    default: {
      return state;
    }
  }
};

const RegisterForm = () => {
  const initialErrors = {
    email: false,
    password: false,
    passwordCheck: false,
    nickname: false,
  };
  const [validateErrors, dispatch] = useReducer(reducer, initialErrors);
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

  const onOverlapCheck = async () => {
    if (validateErrors.email) return;
    const checkInfo = {
      type: 'email',
      value: values.email,
    };
    const res = await onRegisterCheck(checkInfo);

    if (res.error.code) {
      const newErrors: Data = {};
      newErrors.email = text.overlapEmail;
      setErrors(newErrors);
    }
  };

  const onValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    handleChange(e);
    if (name === text.passwordCheck) {
      dispatch({ name, value, password: values.password });
    } else {
      dispatch({ name, value });
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
          error={validateErrors.email}
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
          onClick={onOverlapCheck}
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
          error={validateErrors.password}
        />
        <Input
          sizeType="small"
          placeholder="비밀번호 확인"
          type="password"
          name="passwordCheck"
          onChange={onValidate}
          error={validateErrors.passwordCheck}
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
          error={validateErrors.nickname}
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
