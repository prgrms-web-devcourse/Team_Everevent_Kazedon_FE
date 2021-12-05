import React, { ReactNode } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Common from '@styles/index';

export interface ButtonProps {
  buttonType?: 'primary' | 'warning' | 'confirm';
  children?: ReactNode;
  fontSize: number;
  bold: boolean;
  width?: string | number;
  height?: string | number;
  display: string;
  justifyContent: string;
  alignItems: string;
  backgroundColor: string;
  color: string;
  border: string;
  borderRadius?: number | string;
  padding?: number | string;
  reversal: boolean;
  onClick: () => void;
}

const StyledButton = styled.button`
  ${({
    fontSize,
    bold,
    width,
    height,
    display,
    justifyContent,
    alignItems,
    color,
    backgroundColor,
    border,
    borderRadius,
    padding,
    reversal,
  }: ButtonProps) => css`
    font-size: ${fontSize}px;
    font-weight: ${bold ? 'bold' : 'normal'};
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
    display: ${display};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    color: ${reversal ? backgroundColor : color || Common.colors.background};
    background-color: ${reversal
      ? color || Common.colors.background
      : backgroundColor};
    border: ${reversal ? `2px solid ${backgroundColor}` : border};
    box-sizing: border-box;
    border-radius: ${typeof borderRadius === 'string'
      ? borderRadius
      : `${borderRadius}px`};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
  `}
`;

const Button: React.FC<ButtonProps> = ({
  buttonType,
  onClick,
  ...props
}: ButtonProps) => {
  const backgroundColor =
    buttonType === 'primary'
      ? Common.colors.point
      : buttonType === 'warning'
      ? Common.colors.warning
      : Common.colors.confirm;

  return (
    <StyledButton
      {...props}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
