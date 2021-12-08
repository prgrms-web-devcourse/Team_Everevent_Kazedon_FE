import CardContainer, {
  CardBgColorTypes,
} from '@components/atoms/CardContainer';
import CardList from '@components/atoms/CardList';
import Text from '@components/atoms/Text';
import Header from '@components/domains/Header';
import SortButtons, { buttonArrType } from '@components/domains/SortButtons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import eventsData from 'fixtures/events';
import type { NextPage } from 'next';

const StyledReviewCount = styled.section`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
`;
const StyledLikeButton = styled.section`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
`;
const marginBottomCSS = (width = '4') => css`
  margin-bottom: ${width}px;
`;
const marginLeftCSS = (width = '4') => css`
  margin-left: ${width}px;
`;

const MainPage: NextPage = () => {
  const cardBgColorKeys = Object.keys(styles.cardBackgroundColors);
  const colorLength = cardBgColorKeys.length;
  /* eslint-disable no-console */
  const buttonArr = [
    ['추천순', () => console.log('추천순')],
    ['등록순', () => console.log('등록순')],
    ['마감순', () => console.log('마감순')],
    ['좋아요순', () => console.log('좋아요순')],
  ] as buttonArrType[];
  return (
    <div css={{ width: '375px' }}>
      <Header />
      <SortButtons width={230} buttonArr={buttonArr} buttonMargin={16} />
      <CardList flexType="column" width={375} padding={0} margin={0}>
        {eventsData.map((data, idx) => (
          <CardContainer
            padding={20}
            margin="8px 0"
            bgColorName={cardBgColorKeys[idx % colorLength] as CardBgColorTypes}
            cardType="default"
            key={data.expiredAt}
          >
            <Text
              block
              size="micro"
              css={marginBottomCSS()}
            >{`~(${data.expiredAt})`}</Text>
            <Text block bold css={marginBottomCSS('16')}>
              {data.name}
            </Text>
            <Text
              block
              size="micro"
            >{`${data.remainingParticipants}명 남음`}</Text>
            <Text block size="micro">
              {data.marketName}
            </Text>
            <StyledReviewCount>
              <div>💬</div>
              <Text
                block
                size="micro"
                color={styles.colors.background}
                css={marginLeftCSS()}
              >
                {data.reviewCount}
              </Text>
            </StyledReviewCount>
            <StyledLikeButton>
              <Text block size="large" css={marginBottomCSS()}>
                {data.isLike ? '💗' : '🖤'}
              </Text>
              <Text block size="micro" color={styles.colors.background}>
                {data.likeCount}
              </Text>
            </StyledLikeButton>
          </CardContainer>
        ))}
      </CardList>
    </div>
  );
};

export default MainPage;
