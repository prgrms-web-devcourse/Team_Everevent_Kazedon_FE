import React from 'react';
import styled from '@emotion/styled';
import Text from '@components/atoms/Text';
import Link from 'next/link';

interface NavigatorProps {
  userType: 'user' | 'owner';
}

const NavigatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const fontStyle = {
  marginBottom: '40px',
};

const dynamicUrl = {
  user: '/owner/change',
  owner: '/shop',
};

const dynamicTitle = {
  user: '사업자 전환',
  owner: '가게 보기',
};

const Navigator: React.FC<NavigatorProps> = ({ userType, ...props }) => {
  return (
    <NavigatorContainer {...props}>
      <Text block size="large" style={fontStyle}>
        설정
      </Text>
      {/* eslint-disable @next/next/no-html-link-for-pages */}
      <Link href="/likes/event">
        <a href="/likes/event">
          <Text block size="medium" style={fontStyle}>
            즐겨찾기 / 좋아요
          </Text>
        </a>
      </Link>
      <Link href="/history/events" passHref>
        <a href="/history/events">
          <Text block size="medium" style={fontStyle}>
            활동내역
          </Text>
        </a>
      </Link>
      <Link href="/profile/edit" passHref>
        <a href={dynamicUrl[userType]}>
          <Text block size="medium" style={fontStyle}>
            프로필 수정
          </Text>
        </a>
      </Link>
      <Link href={dynamicUrl[userType]} passHref>
        <a href={dynamicUrl[userType]}>
          <Text block size="medium" style={fontStyle}>
            {dynamicTitle[userType]}
          </Text>
        </a>
      </Link>
      <Link href="/" passHref>
        <a href="/">
          <Text block size="medium" style={fontStyle}>
            로그아웃
          </Text>
        </a>
      </Link>
    </NavigatorContainer>
  );
};

export default Navigator;
