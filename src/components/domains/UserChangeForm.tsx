import React, { useContext } from 'react';
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
import { OwnerContext } from '@contexts/Owner';
import { ChangeOwnerInfo } from '@contexts/Owner/types';

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
  name?: string;
  description?: string;
  location?: string;
};

const UserChangeForm = () => {
  const { handleChangeOwner } = useContext(OwnerContext);

  const { errors, handleChange, handleSubmit } = useForm<
    Partial<ChangeOwnerInfo>
  >({
    initialValues: {
      name: '',
      description: '',
      location: '',
    },
    // TODO: onSubmit에서 values 받아서 처리할 예정
    onSubmit: async (formData) => {
      const ownerInfo = {
        name: formData.name,
        description: formData.description,
        location: formData.location,
      };
      await handleChangeOwner(ownerInfo);
    },
    validate: ({ name, description, location }) => {
      const newErrors: Data = {};

      if (!name) {
        newErrors.name = Constants.ERROR_MSG.marketNameInput;
      }
      if (description) {
        if (description.length > 200) {
          newErrors.description = Constants.ERROR_MSG.marketDescriptionFormat;
        }
      } else {
        newErrors.description = Constants.ERROR_MSG.marketDescriptionInput;
      }

      if (!location) {
        newErrors.location = Constants.ERROR_MSG.marketAddressInput;
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
          error={!!errors.name?.length}
        />
        {errors.name && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.name}
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
          error={!!errors.description?.length}
        />
        {errors.description && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.description}
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
          name="location"
          onChange={handleChange}
          error={!!errors.location?.length}
        />
        {errors.location && (
          <Text
            size="micro"
            fontStyle={{ display: 'flex', justifyContent: 'center' }}
            block
            color={Common.colors.warning}
          >
            {errors.location}
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
