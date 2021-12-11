import { Button, HeaderText, Text } from '@components/atoms';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const StyledEventDescriptions = styled.article`
  margin-bottom: 10px;
`;

const DescriptionBox = styled.div`
  /* display: inline-flex; */
`;
const MoreDescriptionButtonCSS = css`
  margin-left: 10px;
  text-anchor: end;
`;

interface EventDescriptionsProps extends Partial<Event> {
  eventDescription: string;
  [prop: string]: any;
}

const EventDescriptions = ({ eventDescription }: EventDescriptionsProps) => {
  return (
    <StyledEventDescriptions>
      <HeaderText level={2} marginBottom={16}>
        소개
      </HeaderText>
      <DescriptionBox>
        {eventDescription?.length > 20 ? (
          <>
            <Text size="small" width={40} height="auto">
              {`${eventDescription.slice(0, 20)}...`}
            </Text>
            <Button
              display="inline-box"
              fontSize={11}
              reversal
              width="auto"
              height="auto"
              padding={0}
              css={MoreDescriptionButtonCSS}
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
    </StyledEventDescriptions>
  );
};

export default EventDescriptions;
