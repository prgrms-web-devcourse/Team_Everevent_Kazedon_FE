import { Modal } from '@components/atoms';
import React from 'react';
import { LoginInformContainer } from '..';

export type RequestType = '좋아요' | '즐겨찾기' | '설정' | '이벤트 참여' | '';

interface ControlModalProps {
  visible: boolean;
  onClose: () => void;
  requestType: RequestType;
}

const ControlModal = ({ visible, onClose, requestType }: ControlModalProps) => {
  return (
    <Modal
      visible={visible}
      width={280}
      height={184}
      padding={16}
      clickAway
      modalType="default"
      onClose={onClose}
    >
      <LoginInformContainer requestType={requestType} />
    </Modal>
  );
};

export default ControlModal;
