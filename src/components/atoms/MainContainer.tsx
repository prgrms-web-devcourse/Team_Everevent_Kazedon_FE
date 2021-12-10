import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React, { ReactNode } from 'react';

interface StyledMainContainerProps {
  paddingWidth?: number | string;
  paddingHeight?: number | string;
}
export interface MainContainerProps extends StyledMainContainerProps {
  children: ReactNode;
}
const StyledMainContainer: React.FC<MainContainerProps> = styled.main`
  width: 375px;
  height: 100vh;
  @media ${styles.media.mobile} {
    width: 100%;
  }

  ${({ paddingWidth, paddingHeight }: StyledMainContainerProps) => css`
    padding: ${typeof paddingHeight === 'string'
        ? paddingHeight
        : `${paddingHeight}px`}
      ${typeof paddingWidth === 'string' ? paddingWidth : `${paddingWidth}px`};
  `}
`;

const MainContainer = ({
  children,
  paddingWidth = 24,
  paddingHeight = 0,
}: MainContainerProps) => {
  return (
    <StyledMainContainer
      paddingWidth={paddingWidth}
      paddingHeight={paddingHeight}
    >
      {children}
    </StyledMainContainer>
  );
};

export default MainContainer;
