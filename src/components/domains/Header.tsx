import React, { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Text, Icon } from '@components/atoms';
import { css } from '@emotion/react';
import { MdOutlineMenu, MdOutlineArrowBackIosNew } from 'react-icons/md';
import { useRouter } from 'next/router';
import logo from '../../../public/logo.svg';
import { NavModal, NavModalInner } from './NavModal';

export interface HeaderProps {
  children?: ReactNode;
  size?: string | number;
  width?: string | number;
  height?: string | number;
  display?: 'none' | 'flex';
  isLogo?: boolean;
  isVisibleMenu?: boolean;
  isVisiblePrev?: boolean;
  src?: string;
  justifyContent?: 'none' | 'space-between';
  onMenuClick?: () => void;
  onClick?: () => void;
}

const HeaderContainer = styled.div`
  padding: 0;
  margin: 0;
`;

const HeaderSection = styled.div`
  ${({ width, height, justifyContent }: Partial<HeaderProps>) => css`
    display: flex;
    align-items: center;
    justify-content: ${justifyContent || 'none'};
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
  `}
`;

const PrevButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    opacity: 0.5;
    transition: 0.2s;
  }
`;

const Image: React.FC<HeaderProps> = styled.img`
  ${({ size }: Partial<HeaderProps>) => css`
    height: ${typeof size === 'string' ? size : `${size}px`};

    &:hover,
    &:focus {
      opacity: 0.8;
      transition: 0.2s;
    }
  `}
`;

const Header: React.FC<HeaderProps> = ({
  children,
  width = 'auto',
  height = 48,
  size = 24,
  justifyContent = 'none',
  isVisiblePrev = true,
  isVisibleMenu = true,
  ...props
}) => {
  const [navModalVisible, setNavModalVisible] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    return () => setNavModalVisible(() => false);
  }, []);
  const handleMenuClick = () => {
    setNavModalVisible(() => true);
  };

  const handleNavModalClose = () => {
    setNavModalVisible(() => false);
  };

  return (
    <HeaderContainer {...props}>
      <HeaderSection
        width={width}
        height={height}
        justifyContent="space-between"
      >
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          onClick={() => router.push('/')}
        />
        {isVisibleMenu && (
          <Icon size={size}>
            <MdOutlineMenu onClick={handleMenuClick} />
          </Icon>
        )}
      </HeaderSection>
      {isVisiblePrev && (
        <HeaderSection
          width={width}
          height={height}
          justifyContent={justifyContent}
        >
          <PrevButton onClick={() => router.back()}>
            <Icon size={size}>
              <MdOutlineArrowBackIosNew />
            </Icon>
            <Text size="small">뒤로</Text>
          </PrevButton>
        </HeaderSection>
      )}
      <NavModal visible={navModalVisible} onClose={handleNavModalClose}>
        <NavModalInner />
      </NavModal>
    </HeaderContainer>
  );
};

export default React.memo(Header);
