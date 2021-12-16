import CardContainer from '@components/atoms/CardContainer';
import Text from '@components/atoms/Text';
import { css } from '@emotion/react';
import React from 'react';
import styles from '@styles/index';
import styled from '@emotion/styled';
import ImageContainer from '@components/atoms/ImageContainer';

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

const StyledDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export interface reviewDataTypes {
  marketName?: string;
  pictureUrl: string | undefined;
  description: string;
  [prop: string]: any;
}
interface EventReviewPageDataTypes {
  pictureUrl: string | undefined;
  description: string;
  author: string;
  createAt: string;
  [prop: string]: any;
}

interface ReviewCardProps {
  cardType: 'default' | 'box';
  reviewData: reviewDataTypes | EventReviewPageDataTypes;
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
          <Text block size="micro">
            2021.12.09
          </Text>
          <Text block size="micro" css={TextMarginBottomCSS}>
            {`by ${reviewData.author}`}
          </Text>
          <Text block size="micro">
            {reviewData.marketName || ''}
          </Text>
        </>
      ) : (
        <DefaultTypeReviewInner>
          <ImageContainer
            src={reviewData.pictureUrl as string}
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
                {`by ${reviewData.author}`}
              </Text>
            </CardFooterBox>
          </StyledDescriptionBox>
        </DefaultTypeReviewInner>
      )}
    </CardContainer>
  );
};

export default ReviewCard;
