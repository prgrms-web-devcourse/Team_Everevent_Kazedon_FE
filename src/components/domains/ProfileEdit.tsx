import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Button, HeaderText, Input, Text } from '@components/atoms';
import Tab from '@components/domain/Tab';
import { css } from '@emotion/react';

interface Props {
  children?: ReactNode;
  email: string;
}

const ProfileEditContainer = styled.div`
  width: 100%;
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonRight = css`
  margin-left: auto;
`;

const marginBottom = (size: number) => css`
  margin-bottom: ${size}px;
`;

const marginTop = (size) => css`
  margin-top: ${size}px;
`;

const ProfileEdit: React.FC<Props> = ({ email, children, ...props }) => {
  return (
    <ProfileEditContainer {...props}>
      <HeaderText level={1} marginBottom={43}>
        프로필 수정
      </HeaderText>
      <HeaderText level={2} marginBottom={16}>
        Email
      </HeaderText>
      <Text block size="medium">
        {email}
      </Text>
      <HeaderText level={2} marginBottom={7}>
        비밀번호
      </HeaderText>
      <CheckWrapper>
        <Input
          type="password"
          sizeType="small"
          name="password"
          error={false}
          placeholder="비밀번호입력"
        />
        <Button reversal border width={95} css={ButtonRight}>
          비밀번호 확인
        </Button>
      </CheckWrapper>
      <Tab width={279} />
      <HeaderText level={2} marginBottom={7}>
        닉네임 변경
      </HeaderText>
      <CheckWrapper>
        <Input
          type="password"
          sizeType="small"
          name="password"
          error={false}
          placeholder="닉네임"
        />
        <Button reversal border width={95} css={ButtonRight}>
          중복 확인
        </Button>
      </CheckWrapper>
      <CheckWrapper>
        <HeaderText level={2} marginBottom={7}>
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
      </CheckWrapper>
      <Button css={marginTop(32)}>확인</Button>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
