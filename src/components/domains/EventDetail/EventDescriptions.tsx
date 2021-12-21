import { Button, HeaderText, ImageContainer, Text } from '@components/atoms';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';

const StyledEventDescriptions = styled.article`
  margin-bottom: 20px;
`;

const DescriptionBox = styled.div`
  /* display: inline-flex; */
`;
const MoreDescriptionButtonCSS = css`
  margin-left: 10px;
  text-anchor: end;
`;

const MarketImageBox = styled.section`
  display: flex;
  height: auto;
  margin-top: 10px;

  div {
    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

type PictureType = string[];
interface EventDescriptionsProps extends Partial<Event> {
  eventDescription: string;
  pictures: PictureType;
  [prop: string]: any;
}

const EventDescriptions = ({
  eventDescription,
  pictures,
}: EventDescriptionsProps) => {
  const [isEllipsis, setIsEllipsis] = useState(false);
  useEffect(() => {
    if (eventDescription?.length > 20) {
      setIsEllipsis(true);
    }
  }, [eventDescription?.length]);

  const handleMoreDescriptionButtonClick = useCallback(() => {
    setIsEllipsis(() => false);
  }, []);

  return (
    <StyledEventDescriptions>
      <HeaderText level={2} marginBottom={16}>
        이벤트 내용
      </HeaderText>
      <DescriptionBox>
        {isEllipsis ? (
          <>
            <Text size="small" width={40} height="auto">
              {`${eventDescription.slice(0, 50)}...`}
            </Text>
            <Button
              display="inline-box"
              fontSize={11}
              reversal
              width="auto"
              height="auto"
              padding={0}
              css={MoreDescriptionButtonCSS}
              onClick={handleMoreDescriptionButtonClick}
            >
              더보기
            </Button>
          </>
        ) : (
          <Text size="small" width={40} height="auto">
            {eventDescription || '이벤트 소개가 없어요! 😅'}
          </Text>
        )}
      </DescriptionBox>
      <MarketImageBox>
        {pictures.map((url, idx) => (
          <ImageContainer
            key={`${url + idx}`}
            src={url}
            alt="가게 사진"
            width={96}
            height={96}
            margin="0 8px"
          />
        ))}
      </MarketImageBox>
    </StyledEventDescriptions>
  );
};

export default EventDescriptions;
