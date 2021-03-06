import {
  HeaderText,
  Input,
  Textarea,
  Upload,
  Text,
  Button,
  Modal,
} from '@components/atoms';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useForm from '@hooks/useForm';
import Common from '@styles/index';
import { Errors } from '@utils/index';
import { EventCreateFormData } from '@contexts/Shop/types';
import { marginBottom } from '@utils/computed';
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
  const { createShopEvent } = useContext(ShopContext);
  const router = useRouter();
  const { shopId } = router.query;
  const newErrors: EventCreateFormData = {};
  const [files, setFiles] = useState<File[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpload = useCallback(({ value }) => {
    setFiles(() => value);
  }, []);

  const handleModal = useCallback((visible) => {
    setModalVisible(() => visible);
  }, []);

  const onModalButtonClick = () => {
    handleModal(false);
    router.push('/shop');
  };

  const { errors, handleChange, handleSubmit } = useForm<EventCreateFormData>({
    initialValues: {
      name: '',
      marketId: '',
      description: '',
      expiredAt: '',
      maxParticipants: '',
      pictures: [],
    },
    onSubmit: async (eventData) => {
      errors.maxParticipants = '';

      const eventInfo = {
        name: eventData.name,
        marketId: Number(shopId),
        description: eventData.description,
        expiredAt: `${eventData.expiredAt}:00`,
        maxParticipants: Number(eventData.maxParticipants),
      };

      await createShopEvent({
        files,
        request: eventInfo,
      });

      setModalVisible(() => true);
    },
    validate: ({ name, description, expiredAt, maxParticipants }) => {
      const today = new Date();

      if (!name) {
        newErrors.name = Errors.eventNameInput;
      } else if (name.length > 20) {
        newErrors.name = Errors.eventNameFormat;
      }
      if (!description) {
        newErrors.description = Errors.eventDescriptionInput;
      } else if (description.length > 100) {
        newErrors.name = Errors.eventNameFormat;
      }

      if (!expiredAt) {
        newErrors.expiredAt = Errors.eventExpiredAtInput;
      } else {
        const expiredAtDate = new Date(expiredAt);
        if (expiredAtDate < today) {
          newErrors.expiredAt = Errors.eventExpiredAtFormat;
        }
      }

      if (!maxParticipants) {
        newErrors.maxParticipants = Errors.eventMaxParticipantsInput;
      } else if (Number(maxParticipants) > 99) {
        newErrors.maxParticipants = Errors.eventMaxParticipantsFormat;
      }

      return newErrors;
    },
  });

  return (
    <FormWrapper>
      <HeaderText level={2} marginBottom={16}>
        ??????
      </HeaderText>
      <Input
        sizeType="large"
        placeholder="20??? ???????????? ??????????????????."
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
        ??????
      </HeaderText>
      <Textarea
        name="description"
        width={312}
        height={128}
        css={InputCSS}
        placeholder="100??? ???????????? ??????????????????."
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
        ??????
      </HeaderText>
      <Input
        sizeType="large"
        placeholder="??????"
        name="expiredAt"
        type="datetime-local"
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
        ????????????
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
        ??????
      </HeaderText>
      <Upload uploadType="multiple" dispatchEvent={handleUpload} />
      <Text size="micro" block>
        5mb ????????? ???????????? ???????????????.
      </Text>
      <Modal
        modalType="default"
        width={320}
        height={200}
        padding={20}
        visible={modalVisible}
        onClose={() => handleModal(false)}
        clickAway
      >
        <HeaderText level={2} marginBottom={24}>
          ????????? ?????????
        </HeaderText>
        <Text size={14} css={marginBottom(44)}>
          ????????? ????????? ??????????????? ??????????????????~ ????
        </Text>
        <Button onClick={onModalButtonClick}>??????</Button>
      </Modal>
      <ButtonWrapper>
        <Button css={ButtonCSS} onClick={handleSubmit}>
          ?????????
        </Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default CreateEventForm;
