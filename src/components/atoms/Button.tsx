import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Common from '@styles/index';

export interface ButtonProps {
  buttonType?: 'primary' | 'warning' | 'confirm';
  children?: ReactNode;
  fontSize?: number;
  bold?: boolean;
  display?: string;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  color?: string;
  border?: boolean;
  borderRadius?: number | string;
  padding?: number | string;
  reversal?: boolean;
  onClick?: () => void;
}

const StyledButton = styled.button`
  ${({
    fontSize,
    bold = true,
    display,
    width = 280,
    height = 48,
    color = Common.colors.background,
    backgroundColor = Common.colors.point,
    border = false,
    borderRadius = '15px',
    padding,
    reversal,
  }: ButtonProps) => css`
    box-sizing: border-box;
    display: ${display};
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    font-size: ${fontSize}px;
    font-weight: ${bold ? 'bold' : 'normal'};
    color: ${reversal ? backgroundColor : color || Common.colors.background};
    background-color: ${reversal
      ? color || Common.colors.background
      : backgroundColor};
    border: ${border && reversal ? `2px solid ${backgroundColor}` : 'none'};
    border-radius: ${typeof borderRadius === 'string'
      ? borderRadius
      : `${borderRadius}px`};
  `}
`;

const Button: React.FC<ButtonProps> = ({
  buttonType,
  onClick,
  ...props
}: ButtonProps) => {
  const backgroundColor =
    buttonType === 'warning'
      ? Common.colors.warning
      : buttonType === 'confirm'
      ? Common.colors.confirm
      : Common.colors.point;

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
