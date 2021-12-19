import React, { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { Button, HeaderText, Input, Text } from '@components/atoms';
import { css } from '@emotion/react';
import OverlapCheck from './OverlapCheck';
import Tab from './Tab';

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

const marginBottom = (size: number) => css`
  margin-bottom: ${size}px;
`;

const ProfileEdit: React.FC<Props> = ({ email, children, ...props }) => {
  const [buttonFocus, setButtonFocus] = useState(true);

  const handlerChangeTab = (e: React.MouseEvent) => {
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
      <ModifyWrapper css={marginBottom(16)}>
        <HeaderText level={2} marginBottom={16}>
          비밀번호
        </HeaderText>
        <OverlapCheck
          placeholder="비밀번호 입력"
          name="password"
          error={false}
          buttonText="비밀번호 확인"
          onChange={(e) => {}}
          onClick={(e) => {}}
        />
      </ModifyWrapper>
      <Tab
        width={279}
        isLeft
        isLeftFocused={buttonFocus}
        leftText="닉네임 변경"
        rightText="비밀번호 변경"
        onClick={handlerChangeTab}
        css={marginBottom(16)}
      />

      {buttonFocus ? (
        <ModifyWrapper>
          <HeaderText level={2} marginBottom={16}>
            닉네임 변경
          </HeaderText>
          <OverlapCheck
            placeholder="닉네임"
            name="nickname"
            error={false}
            buttonText="닉네임 중복 확인"
            onChange={(e) => {}}
            onClick={(e) => {}}
          />
        </ModifyWrapper>
      ) : (
        <ModifyWrapper>
          <HeaderText level={2} marginBottom={16}>
            비밀번호 변경
          </HeaderText>
          <Input
            sizeType="small"
            placeholder="비밀번호"
            type="password"
            name="password"
            css={marginBottom(8)}
            error={false}
          />
          <Input
            sizeType="small"
            placeholder="비밀번호 확인"
            type="password"
            name="passwordCheck"
            css={marginBottom(8)}
            error={false}
          />
        </ModifyWrapper>
      )}
      <Button>확인</Button>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
