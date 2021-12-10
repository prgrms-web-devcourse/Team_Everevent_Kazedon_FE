import React from 'react';
import styled from '@emotion/styled';
import HeaderText from '@components/atoms/HeaderText';
import Input from '@components/atoms/Input';
import Textarea from '@components/atoms/Textarea';
import Button from '@components/atoms/Button';

const UserChangeFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const UserChangeFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  align-items: left;
  margin-bottom: 31px;
`;

const ButtonWrapper = styled.div`
  margin-top: 38px;
`;

const UserChangeForm = () => {
  return (
    <UserChangeFormContainer>
      <UserChangeFormItem>
        <HeaderText level={1}>사업자 등록</HeaderText>
        <HeaderText level={2}>가게 이름</HeaderText>
        <Input
          sizeType="small"
          placeholder="가게이름"
          name="marketName"
          error={false}
        />
      </UserChangeFormItem>
      <UserChangeFormItem>
        <HeaderText level={2}>가게 설명</HeaderText>
        <Textarea
          name="marketDescription"
          width={280}
          height={152}
          placeholder="   200자 미만으로 작성해주세요."
        />
      </UserChangeFormItem>
      <UserChangeFormItem>
        <HeaderText level={2}>가게 주소</HeaderText>
        <Input
          sizeType="small"
          placeholder="서울시 광진구 OOO동"
          name="marketAddress"
          error={false}
        />
      </UserChangeFormItem>
      <ButtonWrapper>
        <Button>가게 등록</Button>
      </ButtonWrapper>
    </UserChangeFormContainer>
  );
};

export default UserChangeForm;
