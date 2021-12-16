import {
  HeaderText,
  Input,
  Textarea,
  Upload,
  Text,
  Button,
} from '@components/atoms';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Common from '@styles/index';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  width: 310px;
`;

const InputCSS = css`
  margin-bottom: 8px;
  background-color: ${Common.colors.background};
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

const CreateEventForm = () => {
  return (
    <FormWrapper>
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
    </FormWrapper>
  );
};

export default CreateEventForm;
