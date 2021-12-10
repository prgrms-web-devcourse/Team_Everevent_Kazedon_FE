import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React, { ReactNode } from 'react';

export interface CardStyleProps {
  padding?: number | string;
  width?: number | string;
  marginWidth?: number | string;
  marginHeight?: number | string;
  cardType?: 'default' | 'box';
}

export type CardBgColorTypes =
  | 'yellow'
  | 'orange'
  | 'pink'
  | 'yellowGreen'
  | 'mint'
  | 'default';

export interface StyledDefaultCardProps extends CardStyleProps {
  bgColorName: CardBgColorTypes;
}

export interface CardContainerProps extends CardStyleProps {
  children: ReactNode;
  cardType: 'default' | 'box';
  bgColorName?: CardBgColorTypes;
  [prop: string]: any;
}

const StyledDefaultCardContainer = styled('article')<StyledDefaultCardProps>`
  box-sizing: border-box;
  height: 120px;
  filter: drop-shadow(0 4px 4px rgb(0 0 0 / 25%));
  border-radius: 16px;
  ${({ width, marginWidth, marginHeight, padding, bgColorName }) => {
    const mw =
      typeof marginWidth === 'string' ? marginWidth : `${marginWidth}px`;
    const mh =
      typeof marginHeight === 'string' ? marginHeight : `${marginHeight}px`;
    const margin = `${mw} ${mh} ${mw} ${mh}`;
    return css`
      width: ${typeof width === 'string' ? width : `${width}px`};
      padding: ${typeof padding === 'string' ? padding : `${padding}px`};
      margin: ${margin};
      background: ${bgColorName === 'default'
        ? styles.colors.background
        : `linear-gradient(
      93.41deg,
      ${styles.cardBackgroundColors[bgColorName]} 14.53%,
      ${styles.cardBackgroundColors[bgColorName]} 93.07%
    ) `};
    `;
  }}
`;

const StyledBoxCardContainer = styled('article')<CardStyleProps>`
  box-sizing: border-box;
  height: 170px;
  background: ${styles.colors.background};
  filter: drop-shadow(0 4px 4px rgb(0 0 0 / 25%));
  border-radius: 16px;
  ${({ cardType, width, marginWidth, marginHeight, padding }) => {
    const mw =
      typeof marginWidth === 'string' ? marginWidth : `${marginWidth}px`;
    const mh =
      typeof marginHeight === 'string' ? marginHeight : `${marginHeight}px`;
    return css`
      width: ${cardType === 'default'
        ? typeof width === 'string'
          ? width
          : `${width}px`
        : `calc(50% - ${mw})`};
      padding: ${typeof padding === 'string' ? padding : `${padding}px`};

      margin-top: ${mh};
      margin-bottom: ${mh};
    `;
  }}
`;

const CardContainer = ({
  children,
  cardType = 'default',
  width = 'auto',
  padding = 0,
  marginWidth = 0,
  marginHeight = 0,
  bgColorName = 'orange',
  ...props
}: CardContainerProps) => {
  return cardType === 'box' ? (
    <StyledBoxCardContainer
      marginWidth={marginWidth}
      marginHeight={marginHeight}
      padding={padding}
      width={width}
      {...props}
    >
      {children}
    </StyledBoxCardContainer>
  ) : (
    <StyledDefaultCardContainer
      marginWidth={marginWidth}
      marginHeight={marginHeight}
      padding={padding}
      width={width}
      bgColorName={bgColorName}
      {...props}
    >
      {children}
    </StyledDefaultCardContainer>
  );
};

export default CardContainer;
