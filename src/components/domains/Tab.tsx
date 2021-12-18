import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import TabButton from '@components/atoms/TabButton';
import Common from '../../styles';

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
}

const TabContainer: React.FC<Partial<TabProps>> = styled.div`
  ${({ width, height, margin, padding }: Partial<TabProps>) => css`
    display: flex;
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    margin: ${typeof margin === 'string' ? margin : `${margin}px`};
    font-size: ${Common.fontSize.medium};
  `}
`;

const Tab: React.FC<TabProps> = ({
  children,
  width = 320,
  height = 48,
  margin = 0,
  padding = 0,
  isLeft = true,
  isLeftFocused = true,
  leftText,
  rightText,
  ...props
}) => {
  return (
    <TabContainer
      {...props}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
    >
      <TabButton isLeft={isLeft} isLeftFocused={isLeftFocused}>
        {leftText}
      </TabButton>
      <TabButton isLeft={!isLeft} isLeftFocused={!isLeftFocused}>
        {rightText}
      </TabButton>
    </TabContainer>
  );
};

export default Tab;
