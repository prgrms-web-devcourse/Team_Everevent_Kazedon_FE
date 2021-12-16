import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Text, Icon } from '@components/atoms';
import { css } from '@emotion/react';
import { MdOutlineMenu, MdOutlineArrowBackIosNew } from 'react-icons/md';
import logo from '../../../public/logo.svg';

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

const Image: React.FC<HeaderProps> = styled.img`
  ${({ size }: Partial<HeaderProps>) => css`
    height: ${typeof size === 'string' ? size : `${size}px`};
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
  return (
    <HeaderContainer {...props}>
      <HeaderSection
        width={width}
        height={height}
        justifyContent="space-between"
      >
        <Image src={logo.src} width={logo.width} height={logo.height} />
        {isVisibleMenu && (
          <Icon size={size}>
            <MdOutlineMenu />
          </Icon>
        )}
      </HeaderSection>
      {isVisiblePrev && (
        <HeaderSection
          width={width}
          height={height}
          justifyContent={justifyContent}
        >
          <Icon size={size}>
            <MdOutlineArrowBackIosNew />
          </Icon>
          <Text size="small">뒤로</Text>
        </HeaderSection>
      )}
    </HeaderContainer>
  );
};

export default Header;
