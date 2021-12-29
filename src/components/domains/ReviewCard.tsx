import CardContainer from '@components/atoms/CardContainer';
import Text from '@components/atoms/Text';
import { css } from '@emotion/react';
import React, { useEffect } from 'react';
import styles from '@styles/index';
import styled from '@emotion/styled';
import ImageContainer from '@components/atoms/ImageContainer';
import { Review } from '@contexts/review/types';

const DescriptionMarginBottomCSS = css`
  margin-bottom: 12px;
`;

const TextMarginBottomCSS = css`
  margin-bottom: 4px;
`;

const CardBackgroundCSS = css`
  background: ${styles.colors.background};
`;

const DefaultTypeReviewInner = styled.div`
  display: flex;
`;

const ImageContainerCSS = css`
  margin-right: 16px;
`;

const CardFooterBox = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  ${TextMarginBottomCSS}
`;

const MarketNameCSS = css`
  position: absolute;
  bottom: 10px;
  ${TextMarginBottomCSS}
`;

const StyledDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export interface ReviewData extends Partial<Review> {
  marketName?: string;
  pictureUrl?: string | undefined;
  [prop: string]: any;
}
interface ReviewCardProps {
  cardType: 'default' | 'box';
  reviewData: ReviewData;
  marginWidth?: string | number;
  marginHeight?: string | number;
  [prop: string]: any;
}

// TODO: 날짜를 넣을 것인지 백엔드 팀과 협의 후 리뷰 생성 날짜 데이터를 수정한다.

const ReviewCard = ({
  cardType = 'default',
  reviewData,
  marginWidth,
  marginHeight,
}: ReviewCardProps) => {
  useEffect(() => {}, [reviewData]);
  return (
    <CardContainer
      cardType={cardType}
      padding="20px 16px"
      marginWidth={marginWidth}
      marginHeight={marginHeight}
      css={CardBackgroundCSS}
    >
      {cardType === 'box' ? (
        <>
          <Text block size="small" css={DescriptionMarginBottomCSS}>
            {reviewData.description}
          </Text>
          {/* TODO: 추후 해당 옵션값을 넣어줄 것을 백엔드 측에 요구한다. */}
          {reviewData.createdAt && (
            <Text block size="micro">
              {reviewData.createdAt}
            </Text>
          )}
          {reviewData.memberNickname && (
            <Text block size="micro" css={TextMarginBottomCSS}>
              {`by ${reviewData.memberNickname}`}
            </Text>
          )}
          {reviewData.marketName && (
            <Text block size="micro" css={MarketNameCSS}>
              {`To. ${reviewData.marketName}`}
            </Text>
          )}
        </>
      ) : (
        <DefaultTypeReviewInner>
          <ImageContainer
            src={
              reviewData?.pictureUrls?.length
                ? (reviewData.pictureUrls[0] as string)
                : 'https://picsum.photos/200'
            }
            alt="리뷰 사진"
            width={80}
            height={80}
            css={ImageContainerCSS}
          />
          <StyledDescriptionBox>
            <Text block size="small" css={TextMarginBottomCSS}>
              {reviewData.description}
            </Text>
            <CardFooterBox>
              <Text block size="micro">
                2021.12.09
              </Text>
              <Text block size="micro">
                {`by ${reviewData.memberNickname}`}
              </Text>
            </CardFooterBox>
          </StyledDescriptionBox>
        </DefaultTypeReviewInner>
      )}
    </CardContainer>
  );
};

export default ReviewCard;
