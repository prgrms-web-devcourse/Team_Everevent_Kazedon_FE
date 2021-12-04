import React from 'react';
import styled from '@emotion/styled';
import Common from '../../styles';

export interface InputProps {
  type: 'small' | 'large';
  error: boolean | 'undefined';
  placeholder: string;
}

const InputContainer = styled.input<InputProps>`
  box-sizing: border-box;
  width: ${({ type }) => (type === 'small' ? '280px' : '310px')};
  height: 56px;
  padding: 18px;
  font-size: ${Common.fontSize.medium};
  border: 1px solid
    ${({ error }) =>
      error ? Common.colors.warning : Common.colors.placeholder};
  border-radius: 8px;
  outline: none;

  &:focus {
    border: 1px solid ${Common.colors.primary};
  }
`;

const Input: React.FC<InputProps> = ({ ...props }) => (
  <InputContainer {...props} />
);

export default Input;
