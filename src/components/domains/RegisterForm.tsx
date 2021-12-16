import React, { useReducer } from 'react';
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

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const OverlapCheck = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
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
  const { values, errors, setErrors, handleChange, handleSubmit } =
    useForm<RegisterUserFormData>({
      initialValues: {
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
      },
      onSubmit: async (formData: RegisterUserFormData) => {
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

    if (validateErrors[key]) return;

    const checkInfo = {
      type: key,
      value: values[key],
    };
    const res = await onRegisterCheck(checkInfo);
    const newErrors: ErrorUserForm = {};

    if (res.error.code) {
      // 409
      newErrors[key] = text.overlap[key];
      setErrors(newErrors);
    } else {
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
      <HeaderText level={1} marginBottom={25}>
        에브리벤트 가입하기
      </HeaderText>
      <OverlapCheck>
        <Input
          sizeType="small"
          placeholder="이메일"
          name="email"
          onChange={onValidate}
          error={validateErrors.email}
          css={css`
            margin-bottom: 8px;
          `}
        />
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
        <Button
          width={144}
          height={40}
          borderRadius="20px"
          reversal
          border
          onClick={onOverlapCheck}
          bold={false}
          css={css`
            margin-left: auto;
          `}
          name={text.email}
        >
          이메일 중복 체크
        </Button>
      </OverlapCheck>
      <OverlapCheck>
        <Input
          sizeType="small"
          placeholder="닉네임"
          name="nickname"
          onChange={onValidate}
          error={validateErrors.nickname}
          css={css`
            margin-bottom: 8px;
          `}
        />
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
        <Button
          width={144}
          height={40}
          borderRadius="20px"
          reversal
          border
          onClick={onOverlapCheck}
          bold={false}
          css={css`
            margin-left: auto;
          `}
          name={text.nickname}
        >
          닉네임 중복 체크
        </Button>
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
