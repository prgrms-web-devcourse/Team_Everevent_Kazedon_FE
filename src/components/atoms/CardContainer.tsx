import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React from 'react';

export interface CardStyleProps {
  padding: number | string;
  width?: number | string;
  margin?: number | string;
}

export interface StyledDefaultCardProps extends CardStyleProps {
  bgColorName: 'yellow' | 'orange' | 'pink' | 'yellowGreen' | 'mint';
}

export interface CardContainerProps extends CardStyleProps {
  cardType: 'default' | 'box';
  bgColorName: 'yellow' | 'orange' | 'pink' | 'yellowGreen' | 'mint';
}

const StyledDefaultCardContainer = styled('article')<StyledDefaultCardProps>`
  height: 120px;
  filter: drop-shadow(0 4px 4px rgb(0 0 0 / 25%));
  border-radius: 16px;
  ${({ width, margin, padding, bgColorName }) => css`
    width: ${typeof width === 'string' ? width : `${width}px`};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    margin: ${typeof margin === 'string' ? margin : `${margin}px`};
    background: ${`linear-gradient(
      93.41deg,
      ${styles.cardBackgroundColors[bgColorName]} 14.53%,
      ${styles.cardBackgroundColors[bgColorName]} 93.07%
    ) `};
  `}
`;

const StyledBoxCardContainer = styled('article')<CardStyleProps>`
  height: 170px;
  background: ${styles.colors.background};
  filter: drop-shadow(0 4px 4px rgb(0 0 0 / 25%));
  border-radius: 16px;
  ${({ width, margin, padding }) => css`
    width: ${width
      ? typeof width === 'string'
        ? width
        : `${width}px`
      : `calc(50% - ${typeof margin === 'string' ? margin : `${margin}px`}) `};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    margin: ${typeof margin === 'string' ? margin : `${margin}px`};
  `}
`;

const CardContainer = ({
  cardType = 'default',
  width,
  padding = 0,
  margin,
  bgColorName = 'orange',
}: CardContainerProps) => {
  return cardType === 'box' ? (
    <StyledBoxCardContainer margin={margin} padding={padding} width={width} />
  ) : (
    <StyledDefaultCardContainer
      margin={margin}
      padding={padding}
      width={width}
      bgColorName={bgColorName}
    />
  );
};

export default CardContainer;
