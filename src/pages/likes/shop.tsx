import { CardList, HeaderText, MainContainer } from '@components/atoms';
import { Header, Tab } from '@components/domains';
import ShopCard from '@components/domains/ShopCard';
import { useUserHistory } from '@contexts/userHistory';
import { UserContext } from '@contexts/userInfo';
import useLoginCheck from '@hooks/useLoginCheck';
import { marginBottom } from '@utils/computed';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect } from 'react';

const UserFavoriteDetailPage = () => {
  const { dispatchFavoriteShops, initializeHistory, favoriteShopList } =
    useUserHistory();
  const router = useRouter();

  const { user } = useContext(UserContext);
  const { isFirst, handleCheck } = useLoginCheck();

  useEffect(() => {
    if (!isFirst) handleCheck();
  }, [isFirst, handleCheck]);

  const handleTabLeftClick = useCallback(() => {
    router.push(`/likes/event`);
  }, [router]);

  const handleTabRightClick = useCallback(() => {
    router.push(`/likes/shop`);
  }, [router]);

  const handleCardClick = (marketId) => {
    router.push(`/shop/${marketId}`);
  };

  console.log(favoriteShopList)

  useEffect(() => {
    dispatchFavoriteShops(user.userId);
    return () => initializeHistory();
  }, [dispatchFavoriteShops, user.userId, initializeHistory]);

  return (
    <MainContainer paddingWidth={24}>
      <Header isVisiblePrev />
      <HeaderText level={1} marginBottom={32}>
        {`${user.nickname}님의 즐겨찾기 / 좋아요`}
      </HeaderText>
      <Tab
        width={320}
        isLeft
        isLeftFocused={false}
        leftText="즐겨찾기"
        rightText="좋아요"
        onClick={(id) => handleCardClick(id)}
        onClickLeft={handleTabLeftClick}
        onClickRight={handleTabRightClick}
        css={marginBottom(16)}
      />
      <CardList flexType="column" padding={0} margin="10px 0 0 0">
        {favoriteShopList.map((favoriteShop) => (
          <ShopCard
            onClick={() => handleCardClick(favoriteShop.marketId)}
            name={favoriteShop.name}
            key={favoriteShop.marketId}
            shopData={favoriteShop}
            marginHeight={10}
          />
        ))}
      </CardList>
    </MainContainer>
  );
};

export default UserFavoriteDetailPage;
