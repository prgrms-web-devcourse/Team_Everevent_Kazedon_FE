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
  margin-top: 60px;
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

const marginTop = (size: number) => css`
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
      <Text block size="medium" css={marginBottom(16)}>
        {email}
      </Text>
      <HeaderText level={2} marginBottom={16}>
        비밀번호
      </HeaderText>
      <CheckWrapper css={marginBottom(16)}>
        <Input
          type="password"
          sizeType="small"
          name="password"
          error={false}
          placeholder="비밀번호입력"
          css={marginBottom(16)}
        />
        <Button reversal border width={95} css={ButtonRight}>
          비밀번호 확인
        </Button>
      </CheckWrapper>
      <Tab width={279} css={marginBottom(16)} />
      <HeaderText level={2} marginBottom={16}>
        닉네임 변경
      </HeaderText>
      <CheckWrapper css={marginBottom(32)}>
        <Input
          type="password"
          sizeType="small"
          name="password"
          error={false}
          placeholder="닉네임"
          css={marginBottom(16)}
        />
        <Button reversal border width={95} css={ButtonRight}>
          중복 확인
        </Button>
      </CheckWrapper>
      <CheckWrapper css={marginBottom(32)}>
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
      </CheckWrapper>
      <Button>확인</Button>
    </ProfileEditContainer>
  );
};

export default ProfileEdit;
