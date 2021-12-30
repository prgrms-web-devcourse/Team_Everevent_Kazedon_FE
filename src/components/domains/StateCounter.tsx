import { Text } from '@components/atoms';
import styled from '@emotion/styled';
import styles from '@styles/index';
import { marginTop } from '@utils/computed';
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
      <Text size={24} bold color={styles.colors.point}>
        {count}
      </Text>
      <Text size={14} color={styles.colors.primary} css={marginTop(16)}>
        {name}
      </Text>
    </StyledStateCounter>
  );
};

export default StateCounter;
