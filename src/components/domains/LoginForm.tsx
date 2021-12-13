import React, { useContext } from 'react';
import styled from '@emotion/styled';
import HeaderText from '@components/atoms/HeaderText';
import Input from '@components/atoms/Input';
import Button from '@components/atoms/Button';
import useForm from '@hooks/useForm';
import Text from '@components/atoms/Text';
import Common from '@styles/index';
import UserContext from '@contexts/UserContext';
import { text } from '@utils/constantUser';
import { useRouter } from 'next/dist/client/router';

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

interface Data {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { handleLogIn } = useContext(UserContext);

  const { errors, handleChange, handleSubmit } = useForm<Data>({
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
    validate: ({ email, password }: Data) => {
      const newErrors: Data = {};

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
