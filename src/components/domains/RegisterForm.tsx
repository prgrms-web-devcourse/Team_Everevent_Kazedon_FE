import React, { useReducer, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Input, HeaderText, Text } from '@components/atoms';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import { onRegister, onRegisterCheck } from '@axios/user';
import { text } from '@utils/constantUser';
import {
  ErrorUserForm,
  RegisterUserFormData,
} from '@contexts/UserContext/types';
import { registerReducer } from '@contexts/UserContext/reducer';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import OverlapCheck from './OverlapCheck';

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type OverlapParams = 'email' | 'nickname';

const RegisterForm = () => {
  const router = useRouter();
  const [validateErrors, dispatch] = useReducer(registerReducer, {
    email: false,
    password: false,
    passwordCheck: false,
    nickname: false,
  });
  const [successEmailMessage, setSuccessEmailMessage] = useState(false);
  const [successNicknameMessage, setSuccessNicknameMessage] = useState(false);
  const { values, errors, setErrors, handleChange, handleSubmit } =
    useForm<RegisterUserFormData>({
      initialValues: {
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
      },
      onSubmit: async (formData: RegisterUserFormData) => {
        if (!successEmailMessage || !successNicknameMessage) {
          const newErrors: ErrorUserForm = {};
          newErrors.password = text.overlap.check;
          setErrors(newErrors);
          return;
        }

        const registerUserInfo = {
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname,
        };

        const res = await onRegister(registerUserInfo);

        if (!res.error.code) {
          router.push('/register/success');
        }
      },
      validate: ({ email, password, passwordCheck, nickname }) => {
        const newErrors: ErrorUserForm = {};

        if (!email) newErrors.email = text.emailFormat;
        else if (errors.email) newErrors.email = errors.email;
        if (!nickname) newErrors.nickname = text.nicknameFail;
        else if (errors.nickname) newErrors.nickname = errors.nickname;
        if (!password) newErrors.password = text.passwordFail;
        if (!passwordCheck) newErrors.passwordCheck = text.passwordFail;

        return newErrors;
      },
    });

  const onOverlapCheck = async (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    const key = name as OverlapParams;
    const newErrors: ErrorUserForm = JSON.parse(JSON.stringify(errors));

    delete newErrors[key];

    if (!values[key] || validateErrors[key]) {
      newErrors[key] = text[`${key}Input`];
      setErrors(newErrors);
      return;
    }

    const checkInfo = {
      type: key,
      value: values[key],
    };
    const res = await onRegisterCheck(checkInfo);
    if (res.error.code) {
      if (key === text.email) {
        setSuccessEmailMessage(false);
      } else {
        setSuccessNicknameMessage(false);
      }
      newErrors[key] = text.overlap[key];
      setErrors(newErrors);
    } else {
      setErrors(newErrors);

      if (key === text.email) {
        setSuccessEmailMessage(true);
      } else {
        setSuccessNicknameMessage(true);
      }
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
      <HeaderText level={1} marginBottom={25}>
        에브리벤트 가입하기
      </HeaderText>
      <OverlapCheck
        name="email"
        buttonText="이메일 중복 확인"
        error={validateErrors.email}
        onChange={onValidate}
        onClick={onOverlapCheck}
        placeholder="이메일"
      >
        {errors.email && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
            css={css`
              margin-bottom: 8px;
            `}
          >
            {errors.email}
          </Text>
        )}
        {successEmailMessage && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.point}
            css={css`
              margin-bottom: 8px;
            `}
          >
            확인 완료됐습니다.
          </Text>
        )}
      </OverlapCheck>
      <OverlapCheck
        name="nickname"
        buttonText="닉네임 중복 확인"
        error={validateErrors.nickname}
        onChange={onValidate}
        onClick={onOverlapCheck}
        placeholder="닉네임"
      >
        {errors.nickname && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
            css={css`
              margin-bottom: 8px;
            `}
          >
            {errors.nickname}
          </Text>
        )}
        {successNicknameMessage && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.point}
            css={css`
              margin-bottom: 8px;
            `}
          >
            확인 완료됐습니다.
          </Text>
        )}
      </OverlapCheck>
      <PasswordWrapper>
        <Input
          sizeType="small"
          placeholder="비밀번호"
          type="password"
          name="password"
          css={css`
            margin-bottom: 8px;
          `}
          onChange={onValidate}
          error={validateErrors.password}
        />
        <Input
          sizeType="small"
          placeholder="비밀번호 확인"
          type="password"
          name="passwordCheck"
          css={css`
            margin-bottom: 8px;
          `}
          onChange={onValidate}
          error={validateErrors.passwordCheck}
        />
        <Text
          size="micro"
          fontStyle={{ display: 'flex', justifyContent: 'center' }}
          block
          color={
            errors.password ? Common.colors.warning : Common.colors.placeholder
          }
        >
          {errors.password ? errors.password : text.default}
        </Text>
      </PasswordWrapper>
      <Button
        buttonType="primary"
        width={280}
        height={48}
        borderRadius="15px"
        onClick={handleSubmit}
        css={css`
          margin-top: 8px;
        `}
        bold
      >
        회원가입
      </Button>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
