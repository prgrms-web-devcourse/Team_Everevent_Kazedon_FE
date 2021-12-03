import React from 'react';
import styled from '@emotion/styled';
import Common from '../../styles';

export interface InputProps {
  width: string;
  borderRadius: string;
  placeholder: string;
}

const InputContainer = styled.input`
  box-sizing: border-box;
  width: ${({ width }: InputProps) => `${width}px`};
  height: 56px;
  padding: 18px;
  font-size: ${Common.fontSize.medium};
  border: 1px solid ${Common.colors.placeholder};
  border-radius: 8px;
  outline: none;
`;

const Input: React.FC<InputProps> = ({ ...props }) => {
  return <InputContainer {...props} />;
};

export default Input;
