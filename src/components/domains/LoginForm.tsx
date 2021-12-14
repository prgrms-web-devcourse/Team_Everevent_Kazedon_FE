import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Input, HeaderText, Button, Text } from '@components/atoms';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import UserContext from '@contexts/UserContext';
import { text } from '@utils/constantUser';
import { useRouter } from 'next/dist/client/router';
import { ErrorUserForm, LoginUserInfo } from '@contexts/UserContext/types';

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 164px;
  margin-top: 18px;
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 76px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LoginForm = () => {
  const router = useRouter();
  const { handleLogIn } = useContext(UserContext);

  const { errors, handleChange, handleSubmit } = useForm<LoginUserInfo>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await handleLogIn(values);
        router.push('/');
      } catch (e) {
        throw new Error('로그인 실패');
      }
    },
    validate: ({ email, password }) => {
      const newErrors: ErrorUserForm = {};

      if (email) {
        if (!text.emailReg.test(email)) {
          newErrors.email = text.emailFormat;
        }
      } else {
        newErrors.email = text.emailInput;
      }

      if (!password) {
        newErrors.password = text.passwordInput;
      }

      return newErrors;
    },
  });

  return (
    <LoginFormContainer>
      <HeaderText level={1}>에브리벤트에 함께하세요!</HeaderText>
      <InputContainer>
        <InputWrapper>
          <Input
            sizeType="small"
            placeholder="이메일"
            name="email"
            onChange={handleChange}
            error={!!errors.email}
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
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            sizeType="small"
            name="password"
            onChange={handleChange}
            placeholder="비밀번호"
            error={!!errors.password}
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
      </InputContainer>
      <ButtonWrapper>
        <Button
          buttonType="primary"
          width={280}
          height={48}
          borderRadius="15px"
          onClick={handleSubmit}
          bold
        >
          로그인
        </Button>
        <Button
          buttonType="primary"
          width={280}
          height={48}
          borderRadius="15px"
          onClick={() => router.push('/register')}
          reversal
          border
          bold
        >
          회원가입
        </Button>
      </ButtonWrapper>
    </LoginFormContainer>
  );
};

export default LoginForm;
