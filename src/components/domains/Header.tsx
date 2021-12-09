import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Text from '@components/atoms/Text';
import { css } from '@emotion/react';
import prevArrow from '../../../public/icons/prevArrow.svg';
import logo from '../../../public/logo.svg';
import menu from '../../../public/icons/menu.svg';

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
  ${({ size, isLogo }: Partial<HeaderProps>) => css`
    width: ${isLogo ? '108px' : typeof size === 'string' ? size : `${size}px`};
    height: ${typeof size === 'string' ? size : `${size}px`};
  `}
`;

const Header: React.FC<HeaderProps> = ({
  children,
  width = 'auto',
  height = 40,
  justifyContent = 'none',
  isVisiblePrev = true,
  ...props
}) => {
  return (
    <HeaderContainer {...props}>
      <HeaderSection
        width={width}
        height={height}
        justifyContent="space-between"
      >
        <Image src={logo.src} width={logo.width} height={logo.height} isLogo />
        <Image src={menu.src} width={menu.width} height={menu.height} />
      </HeaderSection>
      {isVisiblePrev && (
        <HeaderSection
          width={width}
          height={height}
          justifyContent={justifyContent}
        >
          <Image
            src={prevArrow.src}
            width={prevArrow.width}
            height={prevArrow.height}
          />
          <Text size="small">뒤로</Text>
        </HeaderSection>
      )}
    </HeaderContainer>
  );
};

export default Header;