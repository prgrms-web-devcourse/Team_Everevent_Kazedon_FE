/* eslint-disable no-shadow */
import React, { ReactNode, useContext, useState } from 'react';
import styled from '@emotion/styled';
import { Button, HeaderText, Text } from '@components/atoms';
import { css } from '@emotion/react';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import { ProfileUserInfo } from '@contexts/userInfo/types';
import {
  errorMsg,
  failMsg,
  overlapMsg,
  text,
  validation,
} from '@utils/constantUser';
import { onConfirmPassword, onRegisterCheck } from '@axios/user';
import { useRouter } from 'next/router';
import { deleteProperty, marginBottom } from '@utils/computed';
import { UserContext } from '@contexts/userInfo';
import OverlapCheck from './OverlapCheck';
import Tab from './Tab';
import PasswordForm from './PasswordForm';

interface Props {
  children?: ReactNode;
  email: string;
}

const ProfileEditContainer = styled.form`
  width: 280px;
  margin-top: 60px;
`;

const ModifyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

const styleCenter = { display: 'flex', justifyContent: 'center' };

const ProfileEdit: React.FC<Props> = ({ email, children, ...props }) => {
  const router = useRouter();
  const { isLoading, handleModifyInfo } = useContext(UserContext);
  const [buttonFocus, setButtonFocus] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [successNicknameMessage, setSuccessNicknameMessage] = useState(false);
  const { values, errors, setErrors, handleChange, handleSubmit } =
    useForm<ProfileUserInfo>({
      initialValues: {
        passwordConfirm: '',
        nickname: '',
        password: '',
        passwordCheck: '',
      },
      onSubmit: async (values) => {
        if (isLoading) return;

        const profileEditUserInfo = {
          email,
          nickname: values.nickname === '' ? undefined : values.nickname,
          password: values.password === '' ? undefined : values.password,
        };

        const res = await handleModifyInfo(profileEditUserInfo);

        if (res.code) {
          const newErrors: Partial<ProfileUserInfo> = {};
          newErrors.password = failMsg.profileEdit.submit;

          setErrors(newErrors);
        } else {
          router.replace('/');
        }
      },
      validate: ({ nickname, password, passwordCheck }) => {
        const newErrors: Partial<ProfileUserInfo> = {};

        if (!passwordConfirm) {
          newErrors.password = failMsg.profileEdit.passwordConfirm;
          newErrors.nickname = failMsg.profileEdit.passwordConfirm;
        }
        if (nickname) {
          if (!successNicknameMessage)
            newErrors.nickname = failMsg.profileEdit.nickname;
        }
        if (password || passwordCheck) {
          if (password !== passwordCheck)
            newErrors.password = errorMsg.passwordConfirm;
        }

        return newErrors;
      },
    });

  const handleConfirm = async (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    const key = name as 'passwordConfirm' | 'nickname';
    const newErrors = deleteProperty(errors, key);

    if (!values[key]) {
      if (key === 'passwordConfirm') {
        newErrors[key] = errorMsg.password;
        setPasswordConfirm(false);
      } else {
        newErrors[key] = errorMsg.nickname;
        setSuccessNicknameMessage(false);
      }

      setErrors(newErrors);
      return;
    }

    let res;

    if (key === 'passwordConfirm') {
      if (!validation.password.test(values[key])) {
        newErrors[key] = errorMsg.password;
        setPasswordConfirm(false);
        setErrors(newErrors);

        return;
      }

      res = await onConfirmPassword(values[key] as 'passwordConfirm');

      if (res.error.code) {
        setPasswordConfirm(false);
        newErrors[key] = failMsg.passwordConfirm;
        setErrors(newErrors);
      } else {
        setErrors(newErrors);
        setPasswordConfirm(true);
      }
    } else {
      if (!validation.nickname.test(values[key])) {
        newErrors[key] = errorMsg.nickname;
        setSuccessNicknameMessage(false);
        setErrors(newErrors);
        return;
      }

      const checkInfo = {
        type: key,
        value: values[key],
      };
      res = await onRegisterCheck(checkInfo);

      if (res.error.code) {
        setSuccessNicknameMessage(false);
        newErrors[key] = overlapMsg.nickname;
        setErrors(newErrors);
      } else {
        setErrors(newErrors);
        setSuccessNicknameMessage(true);
      }
    }
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const key = name as keyof ProfileUserInfo;
    if (key === 'passwordConfirm') setPasswordConfirm(false);
    if (key === 'nickname') setSuccessNicknameMessage(false);
    if (errors[key]) {
      const newErrors = deleteProperty(errors, key);
      setErrors(newErrors);
    }

    handleChange(e);
  };

  const handleChangeTab = (e: React.MouseEvent) => {
    const { id } = e.currentTarget as HTMLElement;

    if (id === 'left') setButtonFocus(true);
    else if (id === 'right') setButtonFocus(false);
  };

  return (
    <ProfileEditContainer onSubmit={handleSubmit} {...props}>
      <HeaderText level={1} marginBottom={43}>
        ????????? ??????
      </HeaderText>
      <HeaderText level={2} marginBottom={16}>
        Email
      </HeaderText>
      <Text block size="medium" css={marginBottom(16)}>
        {email}
      </Text>
      <HeaderText level={2} marginBottom={16}>
        ????????????
      </HeaderText>
      <OverlapCheck
        inputType="password"
        placeholder="???????????? ??????"
        name="passwordConfirm"
        error={false}
        buttonText="???????????? ??????"
        onChange={changeInput}
        onClick={handleConfirm}
        css={marginBottom(16)}
      >
        {passwordConfirm ? (
          <Text
            size="micro"
            fontStyle={styleCenter}
            color={Common.colors.point}
            css={marginBottom(8)}
          >
            ?????? ??????????????????.
          </Text>
        ) : (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            css={marginBottom(8)}
            color={
              errors.passwordConfirm
                ? Common.colors.warning
                : Common.colors.placeholder
            }
          >
            {errors.passwordConfirm ? errors.passwordConfirm : text.default}
          </Text>
        )}
      </OverlapCheck>
      <Tab
        width={279}
        isLeft
        isLeftFocused={buttonFocus}
        leftText="????????? ??????"
        rightText="???????????? ??????"
        onClick={handleChangeTab}
        css={marginBottom(16)}
      />
      <ModifyWrapper
        css={css`
          display: ${buttonFocus ? 'block' : 'none'};
        `}
      >
        <HeaderText level={2} marginBottom={16}>
          ????????? ??????
        </HeaderText>
        <OverlapCheck
          placeholder="?????????"
          name="nickname"
          error={false}
          buttonText="????????? ?????? ??????"
          onChange={changeInput}
          onClick={handleConfirm}
        >
          {errors.nickname && (
            <Text
              size="micro"
              fontStyle={styleCenter}
              color={Common.colors.warning}
              css={marginBottom(8)}
            >
              {errors.nickname}
            </Text>
          )}
          {successNicknameMessage && (
            <Text
              size="micro"
              fontStyle={styleCenter}
              color={Common.colors.point}
              css={marginBottom(8)}
            >
              ?????? ??????????????????.
            </Text>
          )}
        </OverlapCheck>
      </ModifyWrapper>
      <ModifyWrapper
        css={css`
          display: ${buttonFocus ? 'none' : 'block'};
        `}
      >
        <HeaderText level={2} marginBottom={16}>
          ???????????? ??????
        </HeaderText>
        <PasswordForm onChange={changeInput} error={false} />
        <Text
          size="micro"
          fontStyle={styleCenter}
          color={
            errors.password ? Common.colors.warning : Common.colors.placeholder
          }
        >
          {errors.password ? errors.password : text.default}
        </Text>
      </ModifyWrapper>
      {isLoading ? (
        <Button
          backgroundColor={Common.colors.placeholder}
          onClick={handleSubmit}
        >
          ?????? ???...
        </Button>
      ) : (
        <Button onClick={handleSubmit}>??????</Button>
      )}
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
