import React from 'react';
import styled from '@emotion/styled';

export interface InputProps {
  width: string;
  borderRadius: string;
  placeholder: string;
}

const InputContainer = styled.input`
  box-sizing: border-box;
  padding: 18px;
  width: ${({ width }: InputProps) => `${width}px`};
  height: 56px;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #bababa;
  outline: none;
`;

const Input: React.FC<InputProps> = ({ ...props }) => {
  return <InputContainer {...props} />;
};

export default Input;
