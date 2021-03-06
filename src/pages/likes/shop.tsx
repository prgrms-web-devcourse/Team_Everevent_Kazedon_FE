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
  const {
    isLoading,
    dispatchFavoriteShops,
    initializeHistory,
    favoriteShopList,
  } = useUserHistory();
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

  const handleCardClick = (marketId: string | number) => {
    router.push(`/shop/${marketId}`);
  };

  useEffect(() => {
    dispatchFavoriteShops(user.userId);
    return () => initializeHistory();
  }, [dispatchFavoriteShops, user.userId, initializeHistory]);

  return (
    <div>
      {!isLoading ? (
        <MainContainer paddingWidth={24}>
          <Header isVisiblePrev />
          <HeaderText level={1} marginBottom={32}>
            {`${user.nickname}님의 즐겨찾기 / 좋아요`}
          </HeaderText>
          <Tab
            width={320}
            isLeft
            isLeftFocused={false}
            leftText="좋아요"
            rightText="즐겨찾기"
            onClickLeft={handleTabLeftClick}
            onClickRight={handleTabRightClick}
            css={marginBottom(16)}
          />
          <CardList flexType="default" padding={0} margin="0">
            {favoriteShopList.map((favoriteShop) => (
              <ShopCard
                onClick={() => handleCardClick(favoriteShop.marketId)}
                key={favoriteShop.marketId}
                shopData={favoriteShop}
                marginWidth={10}
                marginHeight={10}
              />
            ))}
          </CardList>
        </MainContainer>
      ) : (
        <div />
      )}
    </div>
  );
};

export default UserFavoriteDetailPage;
