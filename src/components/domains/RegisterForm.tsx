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
      const newErrors: ErrorUserForm = {};
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
