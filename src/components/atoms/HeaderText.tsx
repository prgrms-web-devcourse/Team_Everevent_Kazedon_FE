import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

export type LevelTypes = 1 | 2 | 3 | 4;

export interface HeaderTextProps {
  children: ReactNode;
  level: LevelTypes;
  marginBottom?: number | string;
  [prop: string]: any;
}
const StyledHeaderTag = styled.div<HeaderTextProps>`
  font-size: ${({ level }: { level: LevelTypes }) => {
    const fontSizes = {
      1: '24px',
      2: '18px',
      3: '14px',
      4: '11px',
    };
    return fontSizes[level];
  }};
  font-weight: 700;
  word-break: keep-all;
  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${typeof marginBottom === 'string'
        ? marginBottom
        : `${marginBottom}px`};
    `}
`;

const HeaderText = ({
  children,
  level = 1,
  marginBottom = 0,
  ...props
}: HeaderTextProps) => {
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <StyledHeaderTag
      as={HeaderTag}
      level={level}
      HeaderTag={HeaderTag}
      marginBottom={marginBottom}
      {...props}
    >
      {children}
    </StyledHeaderTag>
  );
};

export default HeaderText;
