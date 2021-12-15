import styled from '@emotion/styled';
import React from 'react';
import styles from '@styles/index';
import { css } from '@emotion/react';

export interface ButtonProps {
  isConfirm?: boolean;
  modalType: string;
  onClick: () => void;
}

export interface ModalButtonsProps extends Partial<ButtonProps> {
  width: string | number;
  onConfirm: () => void;
  onClose: () => void;
}

const Button: React.FC<ButtonProps> = styled.button`
  width: 80px;
  height: 32px;
  margin: 0 16px;
  font-size: ${styles.fontSize.small};
  font-weight: 700;
  background: transparent;
  border: 0;
  border-radius: 16px;
  ${({ modalType }: ButtonProps) => css`
    color: ${modalType === 'default'
      ? styles.colors.point
      : styles.colors.warning};
    border: 2px solid
      ${modalType === 'default' ? styles.colors.point : styles.colors.warning};
  `}
  ${({ modalType, isConfirm }: ButtonProps) =>
    isConfirm &&
    css`
      color: ${modalType === 'default'
        ? styles.colors.point
        : styles.colors.background};
      background: ${modalType === 'default'
        ? styles.colors.point
        : styles.colors.warning};
    `};
`;

const StyledModalButtons = styled.div`
  position: absolute;
  bottom: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const ModalButtons = ({
  modalType = 'default',
  onClose,
  onConfirm,
}: ModalButtonsProps) => {
  return (
    <StyledModalButtons>
      {onConfirm && (
        <Button modalType={modalType} onClick={onConfirm} isConfirm>
          예
        </Button>
      )}
      <Button modalType={modalType} onClick={onClose}>
        아니오
      </Button>
    </StyledModalButtons>
  );
};

export default ModalButtons;
