import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React, { ReactNode } from 'react';

export interface CardStyleProps {
  padding?: number | string;
  width?: number | string;
  margin?: number | string;
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
  children: ReactNode;
  cardType: 'default' | 'box';
  bgColorName?: CardBgColorTypes;
  [prop: string]: any;
}

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

      margin: ${typeof margin === 'string'
        ? `calc(${margin} * 2) 0`
        : `${margin && margin * 2}px 0`};
    `;
  }}
`;

const BoxCardContainer = ({
  children,
  width = 'auto',
  padding = 0,
  margin = 0,
  ...props
}: CardContainerProps) => {
  return (
    <StyledBoxCardContainer
      margin={margin}
      padding={padding}
      width={width}
      {...props}
    >
      {children}
    </StyledBoxCardContainer>
  );
};

export default BoxCardContainer;
