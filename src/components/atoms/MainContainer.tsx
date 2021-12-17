import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React, { ReactNode } from 'react';

interface StyledMainContainerProps {
  paddingWidth?: number | string;
  paddingHeight?: number | string;
}
export interface MainContainerProps extends StyledMainContainerProps {
  id?: string;
  children: ReactNode;
}
const StyledMainContainer = styled.main<StyledMainContainerProps>`
  position: relative;
  width: 375px;
  min-height: 100vh;

  @media ${styles.media.mobile} {
    width: 100%;
  }

  ${({ paddingWidth }: StyledMainContainerProps) => css`
    padding: 0
      ${typeof paddingWidth === 'string' ? paddingWidth : `${paddingWidth}px`};
  `}

  ${({ paddingHeight }: StyledMainContainerProps) => css`
    padding-top: ${typeof paddingHeight === 'string'
      ? paddingHeight
      : `${paddingHeight}px`};
  `}
`;

const MainContainer = ({
  children,
  paddingWidth = 24,
  paddingHeight = 0,
}: MainContainerProps) => {
  return (
    <StyledMainContainer
      id="main-container"
      paddingWidth={paddingWidth}
      paddingHeight={paddingHeight}
    >
      {children}
    </StyledMainContainer>
  );
};

export default MainContainer;
