import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

export type LevelTypes = 1 | 2 | 3 | 4;

export interface HeaderTextProps {
  children: ReactNode;
  level: LevelTypes;
  [prop: string]: any;
}
const StyledHeaderTag: React.FC<HeaderTextProps> = styled.div`
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
`;

const HeaderText = ({ children, level = 1, ...props }: HeaderTextProps) => {
  const HeaderTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <StyledHeaderTag
      as={HeaderTag}
      level={level}
      HeaderTag={HeaderTag}
      {...props}
    >
      {children}
    </StyledHeaderTag>
  );
};

export default HeaderText;
