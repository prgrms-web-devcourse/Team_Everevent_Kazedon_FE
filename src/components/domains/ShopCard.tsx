import { CardContainer, Text } from '@components/atoms';
import { Shop } from '@contexts/Shop/types';

export interface ShopCardProps {
  shopData?: Shop;
  idx: number;
  width?: number | string;
  marginWidth?: number | string;
  marginHeight?: number | string;
  onClick: (shopId: string) => void;
}

const ShopCard = ({
  shopData,
  width = 'auto',
  marginWidth = 0,
  marginHeight = 10,
  onClick,
}: ShopCardProps) => {
  const { shopId, name, shopName } = shopData as Shop;

  return (
    <CardContainer
      width={width}
      padding={20}
      bgColorName="default"
      cardType="default"
      key={shopId}
      marginWidth={marginWidth}
      marginHeight={marginHeight}
      onClick={onClick}
    >
      <Text>{shopName}</Text>
      <Text>{name}</Text>
    </CardContainer>
  );
};

export default ShopCard;
