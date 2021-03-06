import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Input, HeaderText, Button, Text } from '@components/atoms';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import { UserContext } from '@contexts/userInfo';
import { errorMsg, failMsg, text, validation } from '@utils/constantUser';
import { useRouter } from 'next/dist/client/router';
import { BaseAuthInfo } from '@contexts/userInfo/types';
import { deleteProperty } from '@utils/computed';

const LoginFormContainer = styled.form`
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
  const { isLoading, handleLogIn } = useContext(UserContext);

  const { errors, setErrors, handleChange, handleSubmit } =
    useForm<BaseAuthInfo>({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async (values) => {
        if (isLoading) return;

        const res = await handleLogIn(values);
        const loginError: Partial<BaseAuthInfo> = {};

        if (!res.code) {
          router.push('/');
          return;
        }

        loginError.password = failMsg.login;

        setErrors(loginError);
      },
      validate: ({ email, password }) => {
        const newErrors: Partial<BaseAuthInfo> = {};

        if (!validation.email.test(email)) newErrors.email = errorMsg.email;
        if (!validation.password.test(password))
          newErrors.password = errorMsg.password;

        return newErrors;
      },
    });

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const key = name as keyof BaseAuthInfo;

    if (errors[key]) {
      const resetError = deleteProperty<Partial<BaseAuthInfo>>(errors, key);

      setErrors(resetError);
    }

    handleChange(e);
  };

  return (
    <LoginFormContainer onSubmit={handleSubmit}>
      <HeaderText level={1} marginBottom={32}>
        ?????????????????? ???????????????!
      </HeaderText>
      <InputWrapper>
        <Input
          sizeType="small"
          placeholder="?????????"
          name="email"
          onChange={changeInput}
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
          onChange={changeInput}
          placeholder="????????????"
          error={errors.password === failMsg.login ? false : !!errors.password}
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
            ????????? ???...
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
            ?????????
          </Button>
        )}
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
          ????????????
        </Button>
      </ButtonWrapper>
    </LoginFormContainer>
  );
};

export default LoginForm;
