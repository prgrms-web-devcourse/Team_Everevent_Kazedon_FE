import { CardContainer, Text } from '@components/atoms';
import { CardBgColorTypes } from '@components/atoms/CardContainer';
import { Shop } from '@contexts/Shop/types';
import { FavoriteShop } from '@contexts/userHistory/types';

export interface ShopCardProps {
  shopData?: Shop | FavoriteShop;
  width?: number | string;
  bgColorName?: CardBgColorTypes;
  cardType?: 'default' | 'box';
  marginWidth?: number | string;
  marginHeight?: number | string;
  onClick: (shopId: string) => void;
}

const ShopCard = ({
  shopData,
  bgColorName = 'default',
  cardType = 'default',
  marginWidth = 0,
  marginHeight = 10,
  onClick,
}: ShopCardProps) => {
  const { name } = shopData as Shop;
  console.log(shopData);

  return (
    <CardContainer
      width={`calc(50% - ${+marginWidth * 2}px)`}
      padding={20}
      bgColorName={bgColorName}
      cardType={cardType}
      marginWidth={marginWidth}
      marginHeight={marginHeight}
      onClick={onClick}
    >
      <Text bold>{name}</Text>
    </CardContainer>
  );
};

export default ShopCard;
