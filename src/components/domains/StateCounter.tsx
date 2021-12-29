import { Text } from '@components/atoms';
import styled from '@emotion/styled';
import React from 'react';

interface StateCounterProps {
  name: string;
  count: number;
}
const StyledStateCounter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StateCounter = ({ name, count }: StateCounterProps) => {
  return (
    <StyledStateCounter>
      <Text size={24}>{name}</Text>
      <Text size={14}>{count}</Text>
    </StyledStateCounter>
  );
};

export default StateCounter;
