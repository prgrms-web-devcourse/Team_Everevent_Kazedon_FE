import React, { ReactNode, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import useClickAway from '@hooks/useClickAway';

interface ModalProps {
  visible: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: ${({ visible }: ModalProps) => (visible ? 'block' : 'none')};
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);
`;

const ModalContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400px;
  padding: 34px 26px;
  margin: 0 auto;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 20%);
`;

const Modal: React.FC<ModalProps> = ({
  children,
  visible = false,
  onClose,
  ...props
}) => {
  const ref = useClickAway(() => {
    if (onClose) {
      onClose();
    }
  });

  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return createPortal(
    <BackgroundDim visible={visible}>
      <ModalContainer ref={ref} {...props}>
        {children}
      </ModalContainer>
    </BackgroundDim>,
    el
  );
};

export default Modal;
