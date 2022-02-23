/* eslint-disable no-shadow */
import React, { useContext, useReducer, useState } from 'react';
import styled from '@emotion/styled';
import { Button, HeaderText, Text } from '@components/atoms';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import { onRegisterCheck } from '@axios/user';
import {
  errorMsg,
  failMsg,
  overlapMsg,
  TEXT,
  text,
  validation,
} from '@utils/constantUser';
import { RegisterUserInfo } from '@contexts/userInfo/types';
import { useRouter } from 'next/router';
import { deleteProperty, marginBottom } from '@utils/computed';
import { UserContext } from '@contexts/userInfo';
import registerReducer from '@utils/registerReducer';
import OverlapCheck from './OverlapCheck';
import PasswordForm from './PasswordForm';

const RegisterFormContainer = styled.form`
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

const fontStyle = { display: 'flex', justifyContent: 'center' };

const RegisterForm = () => {
  const router = useRouter();
  const { isLoading, handleRegister } = useContext(UserContext);
  const [validateErrors, dispatch] = useReducer(registerReducer, {
    email: false,
    password: false,
    passwordCheck: false,
    nickname: false,
  });
  const [successEmailMessage, setSuccessEmailMessage] = useState(false);
  const [successNicknameMessage, setSuccessNicknameMessage] = useState(false);
  const { values, errors, setErrors, handleChange, handleSubmit } =
    useForm<RegisterUserInfo>({
      initialValues: {
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
      },
      onSubmit: async (values) => {
        if (isLoading) return;

        const newErrors: Partial<RegisterUserInfo> = {};
        if (!successEmailMessage || !successNicknameMessage) {
          newErrors.password = failMsg.register;
          setErrors(newErrors);
          return;
        }

        const registerUserInfo = {
          email: values.email,
          password: values.password,
          nickname: values.nickname,
        };

        const res = await handleRegister(registerUserInfo);

        if (res.code) {
          newErrors.password = failMsg.register;
          setErrors(newErrors);
          return;
        }

        router.push('/register/success');
      },
      validate: ({ email, password, passwordCheck, nickname }) => {
        const newErrors: Partial<RegisterUserInfo> = {};

        if (!validation.email.test(email)) newErrors.email = errorMsg.email;
        if (!validation.nickname.test(nickname))
          newErrors.nickname = errorMsg.nickname;
        if (
          !validation.password.test(password) ||
          !validation.password.test(passwordCheck)
        )
          newErrors.password = errorMsg.password;
        if (password !== passwordCheck)
          newErrors.password = errorMsg.passwordConfirm;

        return newErrors;
      },
    });

  const onOverlapCheck = async (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    const key = name as keyof Pick<RegisterUserInfo, 'email' | 'nickname'>;
    const overlapErrors = deleteProperty(errors, key);
    const checkInfo = {
      type: key,
      value: values[key],
    };

    if (!values[key] || validateErrors[key]) {
      overlapErrors[key] = errorMsg[key];
      setErrors(overlapErrors);
      return;
    }

    const res = await onRegisterCheck(checkInfo);

    if (res.error.code) {
      if (key === TEXT.EMAIL) setSuccessEmailMessage(false);
      else setSuccessNicknameMessage(false);

      overlapErrors[key] = overlapMsg[key];
      setErrors(overlapErrors);

      return;
    }

    setErrors(overlapErrors);

    if (key === TEXT.EMAIL) setSuccessEmailMessage(true);
    else setSuccessNicknameMessage(true);
  };

  const onValidate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof RegisterUserInfo;

    if (errors[key]) {
      const inputErrors = deleteProperty(errors, key);

      setErrors(inputErrors);
    }

    handleChange(e);

    if (name === TEXT.PASSWORD || name === TEXT.PASSWORDCHECK) {
      if (name === TEXT.PASSWORDCHECK) {
        dispatch({
          name,
          payload: { password: values.password, passwordCheck: value },
        });
      } else dispatch({ name, payload: { [name]: value } });
    } else {
      if (name === TEXT.EMAIL) setSuccessEmailMessage(false);
      else setSuccessNicknameMessage(false);

      dispatch({ name, payload: { [name]: value } });
    }
  };

  return (
    <RegisterFormContainer onSubmit={handleSubmit}>
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
        css={marginBottom(19)}
      >
        {errors.email && (
          <Text
            size="micro"
            fontStyle={fontStyle}
            block
            color={Common.colors.warning}
            css={marginBottom(8)}
          >
            {errors.email}
          </Text>
        )}
        {successEmailMessage && (
          <Text
            size="micro"
            fontStyle={fontStyle}
            block
            color={Common.colors.point}
            css={marginBottom(8)}
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
        css={marginBottom(19)}
      >
        {errors.nickname && (
          <Text
            size="micro"
            fontStyle={fontStyle}
            block
            color={Common.colors.warning}
            css={marginBottom(8)}
          >
            {errors.nickname}
          </Text>
        )}
        {successNicknameMessage && (
          <Text
            size="micro"
            fontStyle={fontStyle}
            block
            color={Common.colors.point}
            css={marginBottom(8)}
          >
            확인 완료됐습니다.
          </Text>
        )}
      </OverlapCheck>
      <PasswordWrapper>
        <PasswordForm onChange={onValidate} error={validateErrors} />
        <Text
          size="micro"
          fontStyle={fontStyle}
          block
          css={marginBottom(8)}
          color={
            errors.password ? Common.colors.warning : Common.colors.placeholder
          }
        >
          {errors.password ? errors.password : text.default}
        </Text>
      </PasswordWrapper>
      {isLoading ? (
        <Button
          buttonType="primary"
          width={280}
          height={48}
          borderRadius="15px"
          onClick={handleSubmit}
          backgroundColor={Common.colors.placeholder}
          bold
        >
          회원가입 중...
        </Button>
      ) : (
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
      )}
    </RegisterFormContainer>
  );
};

export default RegisterForm;
