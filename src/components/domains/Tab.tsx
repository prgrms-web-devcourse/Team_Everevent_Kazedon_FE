import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import TabButton from '@components/atoms/TabButton';

export interface TabProps {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  margin?: string | number;
  padding?: string | number;
  position?:
    | undefined
    | 'static'
    | 'relative'
    | 'absolute'
    | 'fixed'
    | 'sticky';
  isLeft?: boolean;
  isLeftFocused?: boolean;
  borderRadius?: string | number;
  size?: string | number;
  leftText: string;
  rightText: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickLeft?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClickRight?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const TabContainer: React.FC<Partial<TabProps>> = styled.div`
  ${({ width, height, margin, padding }: Partial<TabProps>) => css`
    display: flex;
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    margin: ${typeof margin === 'string' ? margin : `${margin}px`};
    font-size: ${styles.fontSize.medium};
  `}
`;

const Tab = ({
  children,
  width = 320,
  height = 48,
  margin = 0,
  padding = 0,
  isLeft = true,
  isLeftFocused = true,
  leftText,
  rightText,
  onClick,
  onClickLeft,
  onClickRight,
  ...props
}: TabProps) => {
  return (
    <TabContainer
      {...props}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
    >
      <TabButton
        // onClick={onClick}
        onClick={onClickLeft}
        isLeft={isLeft}
        isLeftFocused={isLeftFocused}
        id="left"
      >
        {leftText}
      </TabButton>
      <TabButton
        // onClick={onClick}
        onClick={onClickRight}
        isLeft={!isLeft}
        isLeftFocused={!isLeftFocused}
        id="right"
      >
        {rightText}
      </TabButton>
    </TabContainer>
  );
};

export default Tab;
