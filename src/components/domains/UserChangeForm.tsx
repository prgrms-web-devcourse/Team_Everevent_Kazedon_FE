import React from 'react';
import styled from '@emotion/styled';
import {
  HeaderText,
  Input,
  Text,
  Textarea,
  Button,
} from '@components/atoms/index';
import useForm from '@hooks/useForm';
import Constants from '@utils/index';
import Common from '@styles/index';

const UserChangeFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 58px;
`;

const UserChangeFormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 28px;
`;

const ButtonWrapper = styled.div`
  margin-top: 38px;
`;

type Data = {
  marketName?: string;
  marketDescription?: string;
  marketAddress?: string;
};

const UserChangeForm = () => {
  const { errors, handleChange, handleSubmit } = useForm<Data>({
    initialValues: {
      marketName: '',
      marketDescription: '',
      marketAddress: '',
    },
    // TODO: onSubmit에서 values 받아서 처리할 예정
    onSubmit: () => {},
    validate: ({ marketName, marketDescription, marketAddress }: Data) => {
      const newErrors: Data = {};

      newErrors.marketName = marketName
        ? Constants.ERROR_MSG.default
        : Constants.ERROR_MSG.marketNameInput;

      newErrors.marketDescription = marketDescription
        ? marketDescription.length > 200
          ? Constants.ERROR_MSG.marketDescriptionFormat
          : Constants.ERROR_MSG.default
        : Constants.ERROR_MSG.marketDescriptionInput;

      newErrors.marketAddress = marketAddress
        ? Constants.ERROR_MSG.default
        : Constants.ERROR_MSG.marketAddressInput;

      return newErrors;
    },
  });

  return (
    <UserChangeFormContainer>
      <UserChangeFormItem>
        <HeaderText level={1} marginBottom={44}>
          사업자 등록
        </HeaderText>
        <HeaderText level={2} marginBottom={18}>
          가게 이름
        </HeaderText>
        <Input
          sizeType="small"
          placeholder="가게 이름"
          name="marketName"
          onChange={handleChange}
          error={!!errors.marketName?.length}
        />
        {errors.marketName && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.marketName}
          </Text>
        )}
      </UserChangeFormItem>
      <UserChangeFormItem>
        <HeaderText level={2} marginBottom={18}>
          가게 설명
        </HeaderText>
        <Textarea
          name="marketDescription"
          onChange={handleChange}
          width={280}
          height={152}
          placeholder="200자 미만으로 작성해주세요."
          error={!!errors.marketDescription?.length}
        />
        {errors.marketDescription && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.marketDescription}
          </Text>
        )}
      </UserChangeFormItem>
      <UserChangeFormItem>
        <HeaderText level={2} marginBottom={18}>
          가게 주소
        </HeaderText>
        <Input
          sizeType="small"
          placeholder="서울시 광진구 OOO동"
          name="marketAddress"
          onChange={handleChange}
          error={!!errors.marketAddress?.length}
        />
        {errors.marketAddress && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.marketAddress}
          </Text>
        )}
      </UserChangeFormItem>
      <ButtonWrapper>
        <Button onClick={handleSubmit}>가게 등록</Button>
      </ButtonWrapper>
    </UserChangeFormContainer>
  );
};

export default UserChangeForm;
