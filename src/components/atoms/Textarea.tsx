import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles/index';
import { css } from '@emotion/react';

export interface TextareaProps {
  width?: string | number;
  height?: string | number;
  error?: boolean | 'undefined';
  name: string;
  placeholder?: string;
}

const TextareaContainer = styled.input`
  ${({ width, height, error = false }: TextareaProps) => css`
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
    font-size: ${Common.fontSize.medium};
    border: 1px solid
      ${error ? Common.colors.warning : Common.colors.placeholder};
    border-radius: 8px;

    &:focus {
      border: 1px solid
        ${error ? Common.colors.warning : Common.colors.placeholder};
    }
  `}
`;

const Textarea: React.FC<TextareaProps> = ({ ...props }) => (
  <TextareaContainer {...props} />
);

export default Textarea;
