import styled from '@emotion/styled';
import React from 'react';
import { Text } from '@components/atoms';
import { marginLeft } from '@utils/computed';

export interface CounterProps {
  Icon: React.ReactNode;
  count: string | number;
  margin: string | number;
}

const StyledCounter = styled.div<Partial<CounterProps>>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: ${({ margin }) =>
    typeof margin === 'string' ? margin : `${margin}px`};
`;

const Counter = ({ Icon, count, margin, ...props }: CounterProps) => {
  return (
    <StyledCounter margin={margin} {...props}>
      {Icon}
      <Text size={11} css={marginLeft(4)}>
        {count}
      </Text>
    </StyledCounter>
  );
};

export default Counter;
