import { useState } from 'react';
import { RequestType } from '@components/domains/ControlModal/index';

const useControlModal = () => {
  const [requestType, setRequestType] = useState<RequestType>('');

  const [controlModalVisible, setControlModalVisible] = useState(false);

  return {
    requestType,
    setRequestType,
    controlModalVisible,
    setControlModalVisible,
  };
};

export default useControlModal;
