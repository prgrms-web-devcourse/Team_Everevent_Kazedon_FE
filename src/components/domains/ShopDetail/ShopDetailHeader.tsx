import React, { useContext, useRef, useState } from 'react';
import { HeaderText, Text } from '@components/atoms';
import { ShopInfo } from '@contexts/Shop/types';
import styled from '@emotion/styled';
import Common from '@styles/index';
import { ShopContext } from '@contexts/Shop/index';

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

interface ShopDetailHeaderProps extends Partial<ShopInfo> {
  [index: string]: any;
}

const ShopDetailHeader = ({
  marketId,
  marketName,
  description,
}: ShopDetailHeaderProps) => {
  const [visible, setVisible] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { putShopInfo } = useContext(ShopContext);

  const handleEdit = async () => {
    if (visible) {
      const fetchedDescription =
        descriptionRef.current?.value || '가게 소개가 없어요!';
      setUpdatedDescription(fetchedDescription);
      await putShopInfo(marketId, {
        description: fetchedDescription,
      });
    }
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
            defaultValue={updatedDescription || description?.toString()}
          />
        ) : (
          <Text size="small" block fontStyle={{ overflow: 'hidden' }}>
            {updatedDescription || description}
          </Text>
        )}
        <EditButton onClick={handleEdit}>✏️</EditButton>
      </ShopDescriptionWrapper>
    </ShopDetailHeaderWrapper>
  );
};

export default ShopDetailHeader;
