import { CardList, HeaderText, MainContainer } from '@components/atoms';
import { Header, Tab } from '@components/domains';
import { useEvent } from '@contexts/event';
import { useUserHistory } from '@contexts/userHistory';
import { marginBottom } from '@utils/computed';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserFavoriteDetailPage = () => {
  const { dispatchShopList, initializeShopList } = useEvent();
  const { favoriteShopList } = useUserHistory();
  const router = useRouter();
  const [buttonFocus, setButtonFocus] = useState(true);

  // const handleCardClick = (shopId: string) => {
  //   router.push(`/shop/${shopId}`);
  // };

  useEffect(() => {
    dispatchShopList();
    return () => initializeShopList();
  }, [dispatchShopList, initializeShopList]);
  const onChangeTab = (e: React.MouseEvent) => {
    const { id } = e.currentTarget as HTMLElement;

    if (id === 'right') {
      setButtonFocus(false);
      router.push('/favorites/markets');
    }
  };

  return (
    <MainContainer paddingWidth={24}>
      <Header isVisiblePrev={false} />
      <HeaderText level={1} marginBottom={43}>
        님의 즐겨찾기/좋아요
      </HeaderText>
      <Tab
        width={279}
        isLeft
        isLeftFocused={buttonFocus}
        leftText="이벤트(좋아요)"
        rightText="가게(즐겨찾기)"
        onClick={(e) => onChangeTab(e)}
        css={marginBottom(16)}
      />
      <CardList flexType="column" padding={0} margin="10px 0 0 0">
        {favoriteShopList.map((data, idx) =>
          // <ShopCard
          //   onClick={() => handleCardClick(idx)}
          //   key={data.eventId}
          //   shopData={data}
          //   marginHeight={10}
          // />
          console.log(data, idx)
        )}
      </CardList>
    </MainContainer>
  );
};

export default UserFavoriteDetailPage;
