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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 77px;
  margin-bottom: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 26px;
`;

const LoginForm = () => {
  const router = useRouter();
  const { handleLogIn } = useContext(UserContext);

  const { errors, setErrors, handleChange, handleSubmit } =
    useForm<LoginUserInfo>({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async (values) => {
        try {
          await handleLogIn(values);
          router.push('/');
        } catch {
          const newErrors: ErrorUserForm = {};
          newErrors.password = text.fail;

          setErrors(newErrors);
        }
      },
      validate: ({ email, password }) => {
        const newErrors: ErrorUserForm = {};

        if (!text.emailReg.test(email)) newErrors.email = text.emailFormat;
        if (!text.passwordReg.test(password))
          newErrors.password = text.passwordInput;

        return newErrors;
      },
    });

  return (
    <LoginFormContainer>
      <HeaderText level={1} marginBottom={32}>
        에브리벤트에 함께하세요!
      </HeaderText>
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
          error={errors.password === text.fail ? false : !!errors.password}
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
      </InputWrapper>
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
