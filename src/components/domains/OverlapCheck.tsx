import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Input } from '@components/atoms';

interface Props {
  children?: ReactNode;
  placeholder: string;
  name: string;
  error: boolean;
  buttonText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const marginLeft = css`
  margin-left: auto;
`;

const marginBottom = css`
  margin-bottom: 8px;
`;

const OverlapCheck: React.FC<Props> = ({
  children,
  name,
  error,
  buttonText,
  onChange,
  onClick,
  placeholder = '이메일',
  ...props
}) => {
  return (
    <Container {...props}>
      <Input
        sizeType="small"
        name={name}
        error={error}
        onChange={onChange}
        placeholder={placeholder}
        css={marginBottom}
      />
      {children}
      <Button
        css={marginLeft}
        name={name}
        bold={false}
        reversal
        border
        borderRadius={20}
        width={144}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Container>
  );
};

export default OverlapCheck;
