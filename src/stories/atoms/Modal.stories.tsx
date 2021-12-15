import React, { useState } from 'react';
import Modal, { ModalProps } from '@components/atoms/Modal';
import ModalButtons from '@components/domains/ModalButtons';
import Text from '@components/atoms/Text';
import styles from '@styles/index';
import styled from '@emotion/styled';

export default {
  title: 'Component/atoms/Modal',
  component: Modal,
  argTypes: {
    width: {
      name: 'width',
      defaultValue: 280,
      control: { type: 'range', min: 40, max: 600 },
    },
    height: {
      name: 'height',
      defaultValue: 184,
      control: { type: 'range', min: 40, max: 600 },
    },
    padding: {
      name: 'padding',
      defaultValue: 16,
      control: { type: 'range', min: 0, max: 50 },
    },
    clickAway: {
      name: 'clickAway',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    modalType: {
      name: 'modalType',
      defaultValue: 'default',
      options: ['default', 'warning'],
      control: { type: 'radio' },
    },
  },
};

const StyledText = styled.div`
  margin: 20px 0;
  font-weight: 700;
`;

export const Default = (args: ModalProps) => {
  const [visible, setVisible] = useState(false);
  const onConfirm = () => {};
  const onClose = (): void => {
    setVisible(() => false);
  };
  return (
    <>
      <button onClick={() => setVisible(true)}>Show Modal</button>
      <Modal {...args} visible={visible} onClose={onClose}>
        <StyledText>참여하셨나요?</StyledText>
        <div>
          <Text
            size={11}
            color={styles.colors.title}
            underline={false}
            block
            paragraph
          >
            참여를 완료하시면
          </Text>
          <Text
            size={11}
            color={styles.colors.title}
            underline={false}
            block
            paragraph
          >
            다음에는 참여가 불가능합니다.
          </Text>
        </div>
        <ModalButtons
          modalType="warning"
          width={192}
          onConfirm={onConfirm}
          onClose={onClose}
        />
      </Modal>
    </>
  );
};
