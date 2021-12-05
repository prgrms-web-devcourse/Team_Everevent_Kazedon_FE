import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React from 'react';

export interface CardStyleProps {
  padding?: number | string;
  width?: number | string;
  margin?: number;
  cardType?: 'default' | 'box';
}

export type CardBgColorTypes =
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'yellowGreen'
  | 'mint';

export interface StyledDefaultCardProps extends CardStyleProps {
  bgColorName: CardBgColorTypes;
}

export interface CardContainerProps extends CardStyleProps {
  cardType: 'default' | 'box';
  bgColorName: CardBgColorTypes;
}

const StyledDefaultCardContainer = styled('article')<StyledDefaultCardProps>`
  box-sizing: border-box;
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
  box-sizing: border-box;
  height: 170px;
  background: ${styles.colors.background};
  filter: drop-shadow(0 4px 4px rgb(0 0 0 / 25%));
  border-radius: 16px;
  ${({ cardType, width, margin, padding }) => {
    const mg = `${(margin as number) * 2}px`;
    return css`
      width: ${cardType === 'default'
        ? typeof width === 'string'
          ? width
          : `${width}px`
        : `calc(50% - ${mg})`};
      padding: ${typeof padding === 'string' ? padding : `${padding}px`};
      margin: ${typeof margin === 'string' ? margin : `${margin}px`};
    `;
  }}
`;

const CardContainer = ({
  cardType = 'default',
  width = 'auto',
  padding = 0,
  margin = 0,
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
