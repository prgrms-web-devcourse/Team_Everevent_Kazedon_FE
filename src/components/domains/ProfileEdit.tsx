import React, { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { Button, HeaderText, Text } from '@components/atoms';
import { css } from '@emotion/react';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import { ErrorProfile, ProfileUserInfo } from '@contexts/UserContext/types';
import { text } from '@utils/constantUser';
import { onConfirmPassword, onEditProfile, onRegisterCheck } from '@axios/user';
import { useRouter } from 'next/router';
import { marginBottom } from '@utils/computed';
import OverlapCheck from './OverlapCheck';
import Tab from './Tab';
import PasswordForm from './PasswordForm';

interface Props {
  children?: ReactNode;
  email: string;
}

const ProfileEditContainer = styled.div`
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
      onSubmit: async (formData) => {
        const newErrors: ErrorProfile = {};
        if (!passwordConfirm) {
          newErrors.nickname = text.passwordFail;
          newErrors.password = text.passwordFail;

          setErrors(newErrors);
          return;
        }

        if (formData.nickname && !successNicknameMessage) {
          newErrors.nickname = text.nicknameInput;

          setErrors(newErrors);
          return;
        }

        const profileEditUserInfo = {
          email,
          nickname: formData.nickname === '' ? undefined : formData.nickname,
          password: formData.password === '' ? undefined : formData.password,
        };
        const res = await onEditProfile(profileEditUserInfo);

        if (res.error.code) {
          router.replace('/profile/edit');
        } else {
          router.push('/');
        }
      },
      validate: ({ password }) => {
        const newErrors: ErrorProfile = {};
        if (!password) return newErrors;

        if (
          !text.passwordReg.test(password) ||
          values.password !== values.passwordCheck
        )
          newErrors.password = text.passwordFail;

        return newErrors;
      },
    });

  const handleConfirm = async (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    const key = name as 'passwordConfirm' | 'nickname';
    const newErrors: ErrorProfile = JSON.parse(JSON.stringify(errors));

    delete newErrors[key];

    if (!values[key]) {
      if (key === 'passwordConfirm') {
        newErrors[key] = text.passwordConfirm;
        setPasswordConfirm(false);
      } else {
        newErrors[key] = text.overlap.nickname;
        setSuccessNicknameMessage(false);
      }

      setErrors(newErrors);
      return;
    }

    let res;
    if (key === 'passwordConfirm') {
      res = await onConfirmPassword(values[key] as 'passwordConfirm');

      if (res.error.code) {
        setPasswordConfirm(false);
        newErrors[key] = text.passwordConfirm;
        setErrors(newErrors);
      } else {
        setErrors(newErrors);
        setPasswordConfirm(true);
      }
    } else {
      const checkInfo = {
        type: key,
        value: values[key],
      };
      res = await onRegisterCheck(checkInfo);

      if (res.error.code) {
        setSuccessNicknameMessage(false);
        newErrors[key] = text.overlap.nickname;
        setErrors(newErrors);
      } else {
        setErrors(newErrors);
        setSuccessNicknameMessage(true);
      }
    }
  };

  const handleChangeTab = (e: React.MouseEvent) => {
    const { id } = e.currentTarget as HTMLElement;

    if (id === 'left') setButtonFocus(true);
    else if (id === 'right') setButtonFocus(false);
  };

  return (
    <ProfileEditContainer {...props}>
      <HeaderText level={1} marginBottom={43}>
        프로필 수정
      </HeaderText>
      <HeaderText level={2} marginBottom={16}>
        Email
      </HeaderText>
      <Text block size="medium" css={marginBottom(16)}>
        {email}
      </Text>
      <HeaderText level={2} marginBottom={16}>
        비밀번호
      </HeaderText>
      <OverlapCheck
        inputType="password"
        placeholder="비밀번호 입력"
        name="passwordConfirm"
        error={false}
        buttonText="비밀번호 확인"
        onChange={handleChange}
        onClick={handleConfirm}
        css={marginBottom(16)}
      >
        {errors.passwordConfirm && (
          <Text
            size="micro"
            fontStyle={styleCenter}
            color={Common.colors.warning}
            css={marginBottom(8)}
          >
            {errors.passwordConfirm}
          </Text>
        )}
        {passwordConfirm && (
          <Text
            size="micro"
            fontStyle={styleCenter}
            color={Common.colors.point}
            css={marginBottom(8)}
          >
            확인 완료됐습니다.
          </Text>
        )}
      </OverlapCheck>
      <Tab
        width={279}
        isLeft
        isLeftFocused={buttonFocus}
        leftText="닉네임 변경"
        rightText="비밀번호 변경"
        onClick={handleChangeTab}
        css={marginBottom(16)}
      />
      <ModifyWrapper
        css={css`
          display: ${buttonFocus ? 'block' : 'none'};
        `}
      >
        <HeaderText level={2} marginBottom={16}>
          닉네임 변경
        </HeaderText>
        <OverlapCheck
          placeholder="닉네임"
          name="nickname"
          error={false}
          buttonText="닉네임 중복 확인"
          onChange={handleChange}
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
              확인 완료됐습니다.
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
          비밀번호 변경
        </HeaderText>
        <PasswordForm onChange={handleChange} error={false} />
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
      <Button onClick={handleSubmit}>확인</Button>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
