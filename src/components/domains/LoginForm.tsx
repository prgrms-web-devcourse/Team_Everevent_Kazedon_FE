import React, { useContext } from 'react';
import styled from '@emotion/styled';
import HeaderText from '@components/atoms/HeaderText';
import Input from '@components/atoms/Input';
import Button from '@components/atoms/Button';
import useForm from '@hooks/useForm';
import { useRouter } from 'next/dist/client/router';
<<<<<<< HEAD
import Text from '@components/atoms/Text';
import Common from '@styles/index';
=======
import { UserDispatchContext } from '@contexts/UserContext';
>>>>>>> 5f9fcda (feat: mockdata적용)

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

type Data = {
  email?: string;
  password?: string;
};

const LoginForm = () => {
  const router = useRouter();
<<<<<<< HEAD
  const text = {
    default: '',
    emailReg: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/, //eslint-disable-line
    emailInput: '이메일을 입력해주세요.',
    emailFormat: '이메일 형식을 확인해주세요.',
    passwordInput: '비밀번호를 입력해주세요.',
  };
  const { errors, handleChange, handleSubmit } = useForm<Data>({
=======
  const dispatch = useContext(UserDispatchContext);

  const { handleChange, handleSubmit } = useForm<Data>({
>>>>>>> 5f9fcda (feat: mockdata적용)
    initialValues: {
      email: '',
      password: '',
    },
<<<<<<< HEAD
    onSubmit: (values) => {//eslint-disable-line
      router.push('/');
=======
    onSubmit: async (values) => {
      try {
        // 로그인 API통신 body: values
        // 통신 이후 mock 데이터
        const id = 'seonjae';
        const token = 'fdsafwe123';

        dispatch({
          type: 'LOG_IN',
          user: {
            id,
            token,
          },
        });
        router.push('/');
      } catch (e) {
        throw new Error('로그인 실패');
      }
>>>>>>> 5f9fcda (feat: mockdata적용)
    },
    validate: ({ email, password }: Data) => {
      const newErrors: Data = {};

      newErrors.email = email
        ? !text.emailReg.test(email)
          ? text.emailFormat
          : text.default
        : text.emailInput;

      newErrors.password = password ? text.default : text.passwordInput;

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
            error={errors.email !== text.default}
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
            error={errors.password !== text.default}
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
