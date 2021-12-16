import {
  MainContainer,
  HeaderText,
  Input,
  Textarea,
  Upload,
  Text,
  Button,
} from '@components/atoms';
import React from 'react';
import { css } from '@emotion/react';
import { useRouter } from 'next/dist/client/router';
import styled from '@emotion/styled';

const ButtonWrapper = styled.div`
  width: 310px;
`;

const InputCSS = css`
  margin-bottom: 8px;
`;

const InputNumberCSS = css`
  width: 98px;
  margin-bottom: 8px;
`;

const ButtonCSS = css`
  display: block;
  width: 98px;
  margin-top: 24px;
  margin-left: auto;
`;

const EventCreatePage = () => {
  const router = useRouter();
  const { shopId } = router.query;

  // TODO: shopId 관련하여 추후 처리 예정
  // eslint-disable-next-line no-console
  console.log(shopId);
  return (
    <MainContainer paddingWidth={24} paddingHeight={96}>
      <HeaderText level={1} marginBottom={48}>
        이벤트 만들기
      </HeaderText>
      <HeaderText level={2} marginBottom={16}>
        이름
      </HeaderText>
      <Input
        sizeType="large"
        placeholder="20자 미만으로 작성해주세요."
        name="name"
        error={false}
        css={InputCSS}
      />
      <HeaderText level={2} marginBottom={16}>
        내용
      </HeaderText>
      <Textarea
        name="description"
        width={312}
        height={128}
        css={InputCSS}
        placeholder="100자 미만으로 작성해주세요."
      />
      <HeaderText level={2} marginBottom={16}>
        기한
      </HeaderText>
      <Input
        sizeType="large"
        placeholder="선택"
        name="expiredAt"
        type="date"
        error={false}
        css={InputCSS}
      />
      <HeaderText level={2} marginBottom={16}>
        참여명수
      </HeaderText>
      <Input
        sizeType="large"
        name="expiredAt"
        type="number"
        placeholder="00"
        error={false}
        css={InputNumberCSS}
      />
      <HeaderText level={2} marginBottom={16}>
        사진
      </HeaderText>
      <Upload uploadType="multiple" />
      <Text size="micro" block>
        5mb 이하의 용량으로 올려주세요.
      </Text>
      <ButtonWrapper>
        <Button css={ButtonCSS}>만들기</Button>
      </ButtonWrapper>
    </MainContainer>
  );
};

export default EventCreatePage;
