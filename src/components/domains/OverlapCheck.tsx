import React, { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Input } from '@components/atoms';

interface Props {
  children?: ReactNode;
  placeholder?: string;
  onChange?: () => void;
  onClick?: () => void;
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
  onChange,
  onClick,
  placeholder,
  ...props
}) => {
  return (
    <Container {...props}>
      <Input
        sizeType="small"
        error={false}
        onChange={onChange}
        placeholder={placeholder}
        css={marginBottom}
      />
      {children}
      <Button
        css={marginLeft}
        bold={false}
        reversal
        border
        borderRadius={20}
        width={144}
        onClick={onClick}
      >
        이메일 중복 체크
      </Button>
    </Container>
  );
};

export default OverlapCheck;
