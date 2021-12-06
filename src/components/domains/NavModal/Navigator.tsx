import React from 'react';
import styled from '@emotion/styled';
import Text from '@components/atoms/Text';

interface NavigatorProps {
  user: 'user' | 'owner';
}

const NavigatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Navigator: React.FC<NavigatorProps> = ({ user, ...props }) => {
  const fontStyle = {
    marginBottom: '40px',
  };

  return (
    <NavigatorContainer {...props}>
      <Text as="div" size="large" style={fontStyle}>
        설정
      </Text>
      <Text as="div" size="medium" style={fontStyle}>
        즐겨찾기 / 좋아요
      </Text>
      <Text as="div" size="medium" style={fontStyle}>
        활동내역
      </Text>
      <Text as="div" size="medium" style={fontStyle}>
        프로필 수정
      </Text>
      <Text as="div" size="medium" style={fontStyle}>
        {user === 'user' ? '사업자 전환' : '가게보기'}
      </Text>
      <Text as="div" size="medium" style={fontStyle}>
        로그아웃
      </Text>
    </NavigatorContainer>
  );
};

export default Navigator;
