import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
import {
  HeaderText,
  Input,
  Text,
  Textarea,
  Button,
} from '@components/atoms/index';
import useForm from '@hooks/useForm';
import { Errors } from '@utils/index';
import Common from '@styles/index';
import { OwnerContext } from '@contexts/Owner';
import { ChangeOwnerInfo } from '@contexts/Owner/types';
import { useRouter } from 'next/dist/client/router';

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

type ErrorData = {
  name?: string;
  address?: string;
  description?: string;
};

const UserChangeForm = () => {
  const { handleChangeOwner } = useContext(OwnerContext);
  const [errorName, setErrorName] = useState<string>('');
  const [errorAddress, setErrorAddress] = useState<string>('');
  const [errorDescription, setErrorDescription] = useState<string>('');
  const router = useRouter();

  const newErrors: ErrorData = {};

  const { handleChange, handleSubmit } = useForm<Partial<ChangeOwnerInfo>>({
    initialValues: {
      name: '',
      address: '',
      description: '',
    },
    onSubmit: async (formData) => {
      const ownerInfo = {
        name: formData.name,
        address: formData.address,
        description: formData.description,
      };

      await handleChangeOwner(ownerInfo);
      router.push('/owner/success');
    },
    validate: ({ name, description, address }) => {
      if (!name) {
        setErrorName(Errors.marketNameInput);
        newErrors.address = errorName;
      } else {
        setErrorName('');
      }
      if (description) {
        if (description.length > 200) {
          setErrorDescription(Errors.marketDescriptionFormat);
          newErrors.description = errorDescription;
        } else {
          setErrorDescription('');
        }
      } else {
        setErrorDescription(Errors.marketDescriptionInput);
        newErrors.description = errorDescription;
      }

      if (!address) {
        setErrorAddress(Errors.marketAddressInput);
        newErrors.address = errorAddress;
      } else {
        setErrorAddress('');
      }

      if (Object.keys(newErrors).length === 0) {
        setErrorName('');
        setErrorDescription('');
        setErrorAddress('');
      }
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
          name="name"
          onChange={handleChange}
          error={!!errorName?.length}
        />
        {errorName !== '' && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errorName}
          </Text>
        )}
      </UserChangeFormItem>
      <UserChangeFormItem>
        <HeaderText level={2} marginBottom={18}>
          가게 설명
        </HeaderText>
        <Textarea
          name="description"
          onChange={handleChange}
          width={280}
          height={152}
          placeholder="200자 미만으로 작성해주세요."
          error={!!errorDescription.length}
        />
        {errorDescription !== '' && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errorDescription}
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
          name="address"
          onChange={handleChange}
          error={!!errorAddress?.length}
        />
        {errorAddress !== '' && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errorAddress}
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
