import React, { HTMLInputTypeAttribute } from 'react';
import styled from '@emotion/styled';
import Common from '@styles/index';

export interface InputProps {
  type?: HTMLInputTypeAttribute;
  sizeType: 'small' | 'large';
  error: boolean | 'undefined';
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer = styled.input<InputProps>`
  box-sizing: border-box;
  width: ${({ sizeType }) => (sizeType === 'small' ? '280px' : '310px')};
  height: 56px;
  padding: 18px;
  font-size: ${Common.fontSize.medium};
  border: 1px solid
    ${({ error }) =>
      error ? Common.colors.warning : Common.colors.placeholder};
  border-radius: 8px;
  outline: none;

  &:focus {
    border: 1px solid
      ${({ error }) => (error ? Common.colors.warning : Common.colors.primary)};
  }
`;

const Input: React.FC<InputProps> = ({ type = 'text', ...props }) => (
  <InputContainer type={type} {...props} />
);

export default Input;
