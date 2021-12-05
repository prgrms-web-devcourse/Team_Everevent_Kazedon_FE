import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

export interface CardListProps {
  children: ReactNode;
  flexType: 'default' | 'column' | 'none';
  width: string | number;
  padding: string | number;
  margin: string | number;
  overflowHeight?: string | number | undefined;
}

const StyledCardList: React.FC<CardListProps> = styled.section`
  ${({
    flexType,
    width,
    padding,
    margin,
    overflowHeight,
  }: CardListProps) => css`
    box-sizing: border-box;
    display: ${flexType === 'none' ? 'block' : 'flex'};
    flex-direction: ${flexType === 'default' ? 'row' : 'column'};
    flex-wrap: ${flexType === 'default' ? 'wrap' : 'nowrap'};
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${overflowHeight
      ? typeof overflowHeight === 'string'
        ? overflowHeight
        : `${overflowHeight}px`
      : 'auto'};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    margin: ${typeof margin === 'string' ? margin : `${margin}px`};
    overflow: ${overflowHeight ? 'hidden' : 'visible'};
  `}
`;

const CardList = ({
  children,
  flexType = 'default',
  width = '100%',
  padding = 0,
  margin = 0,
  overflowHeight = undefined,
}: CardListProps) => {
  return (
    <StyledCardList
      flexType={flexType}
      padding={padding}
      width={width}
      margin={margin}
      overflowHeight={overflowHeight}
    >
      {children}
    </StyledCardList>
  );
};

export default CardList;
