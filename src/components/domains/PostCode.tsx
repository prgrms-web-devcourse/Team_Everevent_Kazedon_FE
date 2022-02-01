import styled from '@emotion/styled';
import React, { SetStateAction } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';

const StyledPostcode = styled.div`
  width: 300px;
  height: calc(100%);
`;

interface TPostCode {
  onChangeAddressInput: (address: string) => void;
  setShowPostCode: React.Dispatch<SetStateAction<boolean>>;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
  autoClose: boolean;
}

const PostCode = ({
  onChangeAddressInput,
  setShowPostCode,
  setModalVisible,
  ...props
}: TPostCode) => {
  const handleComplete = (data: Address) => {
    const address = `${data.sido} ${data.sigungu} ${data.bname}`;

    onChangeAddressInput(address);
    setShowPostCode(() => false);

    return address;
  };

  return (
    <StyledPostcode>
      <DaumPostcode
        style={{ height: '100%' }}
        onComplete={handleComplete}
        {...props}
      />
    </StyledPostcode>
  );
};

export default PostCode;
