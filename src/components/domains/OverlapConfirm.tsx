import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Input, Button } from '@components/atoms';

interface Props {
  children: ReactNode;
  name: string;
  placeholder?: string;
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const OverlapConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const marginLeft = css`
  margin-left: auto;
`;
const marginBottom = css`
  margin-bottom: 8px;
`;

const OverlapConfirm: React.FC<Props> = ({
  children,
  name,
  placeholder,
  error,
  onChange,
  onClick,
  ...props
}) => {
  return (
    <OverlapConfirmContainer {...props}>
      <Input
        sizeType="small"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        error={error}
        css={marginBottom}
      />
      {children}
      <Button
        width={144}
        height={40}
        borderRadius={20}
        reversal
        border
        onClick={onClick}
        bold={false}
        name={name}
        css={marginLeft}
      >
        이메일 중복 체크
      </Button>
    </OverlapConfirmContainer>
  );
};

export default OverlapConfirm;
