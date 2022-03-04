import { CardContainer, Icon, Text } from '@components/atoms';
import { CardBgColorTypes } from '@components/atoms/CardContainer';
import Counter from '@components/atoms/Counter';
import { Shop } from '@contexts/Shop/types';
import { FavoriteShop } from '@contexts/userHistory/types';
import { css } from '@emotion/react';
import { MdStar } from 'react-icons/md';

export interface ShopCardProps {
  shopData?: Shop | FavoriteShop;
  width?: number | string;
  bgColorName?: CardBgColorTypes;
  cardType?: 'default' | 'box';
  marginWidth?: number | string;
  marginHeight?: number | string;
  onClick: (shopId: string) => void;
}

const CounterCSS = css`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const ShopCard = ({
  shopData,
  bgColorName = 'default',
  cardType = 'default',
  marginWidth = 0,
  marginHeight = 10,
  onClick,
}: ShopCardProps) => {
  const { name, favoriteCount } = shopData as Shop;

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
      <Counter
        Icon={
          <Icon size="16px" color="#FFDD2B">
            <MdStar />
          </Icon>
        }
        count={favoriteCount}
        margin="0 9px 14px 0"
        css={CounterCSS}
      />
    </CardContainer>
  );
};

export default ShopCard;
