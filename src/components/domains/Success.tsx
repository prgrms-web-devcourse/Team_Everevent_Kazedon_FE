import { Button, HeaderText } from '@components/atoms';
import Icon from '@components/atoms/Icon';
import styled from '@emotion/styled';
import React from 'react';
import { MdStar } from 'react-icons/md';
import Common from '@styles/index';
import { css } from '@emotion/react';

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ElementWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const marginBottom = (size: number) => css`
  margin-bottom: ${size}px;
`;

interface TextType {
  successMessage: string;
  buttonText: string;
}

// 필요한것 성공메시지, 버튼 텍스트, 이동 함수
interface Props {
  text: TextType;
  onClick: () => void;
}

const Success: React.FC<Props> = ({ text, onClick }) => {
  return (
    <SuccessContainer>
      <ElementWrapper css={marginBottom(44)}>
        <HeaderText level={1}>{text.successMessage}</HeaderText>
      </ElementWrapper>
      <ElementWrapper css={marginBottom(60)}>
        <Icon size={166} color={Common.colors.yellow}>
          <MdStar />
        </Icon>
      </ElementWrapper>
      <ElementWrapper>
        <Button buttonType="primary" onClick={onClick}>
          {text.buttonText}
        </Button>
      </ElementWrapper>
    </SuccessContainer>
  );
};

export default Success;
