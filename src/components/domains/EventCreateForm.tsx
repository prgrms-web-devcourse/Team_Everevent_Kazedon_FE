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
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import Constants from '@utils/index';
import { EventCreateFormData } from '@contexts/Shop/types';
import { ShopContext } from '@contexts/Shop/index';
import { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  width: 310px;
`;

const InputCSS = css`
  margin-bottom: 18px;
  background-color: ${Common.colors.background};
`;

const InputNumberCSS = css`
  width: 98px;
  margin-bottom: 18px;
`;

const ButtonCSS = css`
  display: block;
  width: 98px;
  margin-top: 24px;
  margin-left: auto;
`;

const CreateEventForm = () => {
  // createShopEvent
  const { createShopEvent } = useContext(ShopContext);
  const router = useRouter();
  const { shopId } = router.query;
  const newErrors: EventCreateFormData = {};
  const [files, setFiles] = useState<File[] | []>([]);

  const handleUpload = useCallback(({ value }) => {
    setFiles(() => value);
  }, []);

  const { errors, handleChange, handleSubmit } = useForm<
    Partial<EventCreateFormData>
  >({
    initialValues: {
      name: '',
      marketId: '',
      description: '',
      expiredAt: '',
      maxParticipants: '',
    },
    onSubmit: async (eventData) => {
      errors.maxParticipants = '';

      const eventInfo = {
        name: eventData.name,
        marketId: Number(shopId),
        description: eventData.description,
        expiredAt: eventData.expiredAt,
        maxParticipants: Number(eventData.maxParticipants),
      };

      // eslint-disable-next-line no-console
      /* console.log('formData: ', {
        files,
        request: eventInfo,
      }); */

      await createShopEvent({
        files,
        request: eventInfo,
      });
    },
    validate: ({ name, description, expiredAt, maxParticipants }) => {
      const today = new Date();

      // TODO: marketId
      if (!name) {
        newErrors.name = Constants.ERROR_MSG.eventNameInput;
      } else if (name.length > 20) {
        newErrors.name = Constants.ERROR_MSG.eventNameFormat;
      }
      if (!description) {
        newErrors.description = Constants.ERROR_MSG.eventDescriptionInput;
      } else if (description.length > 100) {
        newErrors.name = Constants.ERROR_MSG.eventNameFormat;
      }

      if (!expiredAt) {
        newErrors.expiredAt = Constants.ERROR_MSG.eventExpiredAtInput;
      } else {
        const expiredAtDate = new Date(expiredAt);
        if (expiredAtDate < today) {
          newErrors.expiredAt = Constants.ERROR_MSG.eventExpiredAtFormat;
        }
      }

      if (!maxParticipants) {
        newErrors.maxParticipants =
          Constants.ERROR_MSG.eventMaxParticipantsInput;
      } else if (Number(maxParticipants) > 99) {
        newErrors.maxParticipants =
          Constants.ERROR_MSG.eventMaxParticipantsFormat;
      }

      return newErrors;
    },
  });

  return (
    <FormWrapper>
      <HeaderText level={2} marginBottom={16}>
        이름
      </HeaderText>
      <Input
        sizeType="large"
        placeholder="20자 미만으로 작성해주세요."
        name="name"
        error={!!errors.name?.length}
        css={InputCSS}
        onChange={handleChange}
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
      <HeaderText level={2} marginBottom={16}>
        내용
      </HeaderText>
      <Textarea
        name="description"
        width={312}
        height={128}
        css={InputCSS}
        placeholder="100자 미만으로 작성해주세요."
        error={!!errors.description?.length}
        onChange={handleChange}
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
      <HeaderText level={2} marginBottom={16}>
        기한
      </HeaderText>
      <Input
        sizeType="large"
        placeholder="선택"
        name="expiredAt"
        type="date"
        error={!!errors.expiredAt?.length}
        css={InputCSS}
        onChange={handleChange}
      />
      {errors.expiredAt && (
        <Text
          size="micro"
          fontStyle={{ display: 'flex', justifyContent: 'center' }}
          block
          color={Common.colors.warning}
        >
          {errors.expiredAt}
        </Text>
      )}
      <HeaderText level={2} marginBottom={16}>
        참여명수
      </HeaderText>
      <Input
        sizeType="large"
        name="maxParticipants"
        placeholder="00"
        error={!!errors.maxParticipants?.length}
        css={InputNumberCSS}
        onChange={handleChange}
      />
      {errors.maxParticipants && (
        <Text
          size="micro"
          fontStyle={{
            display: 'flex',
            justifyContent: 'left',
            marginBottom: '8px',
          }}
          block
          color={Common.colors.warning}
        >
          {errors.maxParticipants}
        </Text>
      )}
      <HeaderText level={2} marginBottom={16}>
        사진
      </HeaderText>
      <Upload uploadType="multiple" dispatchEvent={handleUpload} />
      <Text size="micro" block>
        5mb 이하의 용량으로 올려주세요.
      </Text>
      <ButtonWrapper>
        <Button css={ButtonCSS} onClick={handleSubmit}>
          만들기
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default CreateEventForm;
