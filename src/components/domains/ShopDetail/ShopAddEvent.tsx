import React from 'react';
import { Text } from '@components/atoms';
import styled from '@emotion/styled';
import Common from '@styles/index';
import { ShopEvent } from '@contexts/Shop/types';
import { useRouter } from 'next/dist/client/router';

const ShopAddEventWrapper = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 308px;
  height: 118px;
  background: ${Common.colors.background};
  border: 2px dashed ${Common.colors.point};
  border-radius: 16px;

  &:hover {
    cursor: pointer;
    background-color: rgb(0 0 0 / 5%);
  }
`;

interface ShopEventsProps extends Partial<ShopEvent> {
  [index: string]: any;
}

const ShopAddEvent = ({ marketId }: ShopEventsProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/shop/${marketId}/create`);
  };

  return (
    <ShopAddEventWrapper onClick={handleClick}>
      <Text size={48} color={Common.colors.point}>
        +
      </Text>
      <Text size="small" color={Common.colors.point}>
        이벤트 만들기
      </Text>
    </ShopAddEventWrapper>
  );
};

export default ShopAddEvent;
