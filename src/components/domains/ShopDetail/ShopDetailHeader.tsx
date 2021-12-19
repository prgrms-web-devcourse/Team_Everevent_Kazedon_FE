import React, { useRef, useState } from 'react';
import { HeaderText, Text } from '@components/atoms';
import { Shop } from '@contexts/Shop/types';
import styled from '@emotion/styled';
import Common from '@styles/index';

const ShopDetailHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 58px;
  margin-bottom: 24px;
`;

const ShopDescriptionWrapper = styled.div`
  display: flex;
  gap: 30px;
  width: 318px;
`;

const DescriptionTextarea = styled.textarea`
  width: 250px;
  font-size: ${Common.fontSize.small};
  resize: none;
  border: 1px solid ${Common.colors.placeholder};
  border-radius: 8px;
`;

const EditButton = styled.button`
  all: unset;
  margin-left: auto;
`;

interface ShopDetailHeaderProps extends Partial<Shop> {
  [index: string]: any;
}

const ShopDetailHeader = ({
  marketName,
  description,
}: ShopDetailHeaderProps) => {
  const [visible, setVisible] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = () => {
    // TODO: 추후 리팩토링할 예정입니다. 수정 API연동예정
    // eslint-disable-next-line no-unused-expressions
    visible ? setVisible(false) : setVisible(true);
  };

  return (
    <ShopDetailHeaderWrapper>
      <HeaderText level={1} marginBottom={24}>
        {marketName}
      </HeaderText>
      <ShopDescriptionWrapper>
        {visible ? (
          <DescriptionTextarea
            ref={descriptionRef}
            defaultValue={description || ''}
          />
        ) : (
          <Text size="small" block fontStyle={{ overflow: 'hidden' }}>
            {description || '가게소개가 없어요!'}
          </Text>
        )}
        <EditButton onClick={handleEdit}>✏️</EditButton>
      </ShopDescriptionWrapper>
    </ShopDetailHeaderWrapper>
  );
};

export default ShopDetailHeader;
