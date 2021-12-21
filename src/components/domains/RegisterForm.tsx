import React, { useReducer, useState } from 'react';
import styled from '@emotion/styled';
import { Button, HeaderText, Text } from '@components/atoms';
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
import { marginBottom } from '@utils/computed';
import OverlapCheck from './OverlapCheck';
import PasswordForm from './PasswordForm';

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

        if (!text.emailReg.test(email)) newErrors.email = text.emailInput;
        if (!text.nicknameReg.test(nickname))
          newErrors.nickname = text.emailInput;
        if (
          !text.passwordReg.test(password) ||
          !text.passwordReg.test(passwordCheck)
        )
          newErrors.password = text.passwordFail;
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
        css={marginBottom(19)}
      >
        {errors.email && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
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
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
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
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
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
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
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
          fontStyle={{ display: 'flex', justifyContent: 'center' }}
          block
          css={marginBottom(8)}
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
        bold
      >
        회원가입
      </Button>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
