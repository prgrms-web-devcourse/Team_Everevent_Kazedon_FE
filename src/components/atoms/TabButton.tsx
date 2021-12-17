import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import Text from '@components/atoms/Text';
import Common from '../../styles';

export interface TabButtonProps {
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  size?: string | number;
  fontSize?: string | number;
  backgroundColor?: string;
  margin?: string | number;
  padding?: string | number;
  color?: string;
  fontColor?: string;
  borderColor?: string;
  block?: boolean;
  isLeft?: boolean;
  isLeftFocused?: boolean;
  display?: 'none' | 'flex';
}

const StyledTab = styled.div`
  ${({
    width,
    height,
    margin,
    padding,
    isLeft,
    isLeftFocused,
    borderColor,
  }: Partial<TabButtonProps>) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    margin: ${typeof margin === 'string' ? margin : `${margin}px`};
    font-size: ${Common.fontSize.medium};
    color: ${isLeftFocused ? Common.colors.background : Common.colors.point};
    background-color: ${isLeftFocused
      ? Common.colors.point
      : Common.colors.background};
    border: 2px solid
      ${isLeftFocused ? Common.colors.point : Common.colors.background};
    border-radius: ${isLeft ? '16px 0px 0px 16px' : '0px 16px 16px 0px'};
    box-shadow: 0 1px 4px rgb(0 0 0 / 25%);
  `}
`;

const TabButton: React.FC<TabButtonProps> = ({
  children,
  width = 160,
  height = 48,
  margin = 0,
  padding = 0,
  isLeft = true,
  isLeftFocused = true,
  color,
  backgroundColor,
  borderColor,
  ...props
}) => {
  return (
    <StyledTab
      {...props}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      isLeft={isLeft}
      isLeftFocused={isLeftFocused}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      <Text>{children}</Text>
    </StyledTab>
  );
};

export default TabButton;
