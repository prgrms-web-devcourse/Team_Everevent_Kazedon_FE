import React, { useEffect, ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { createPortal } from 'react-dom';
import useClickAway from '@hooks/useClickAway';
import { css } from '@emotion/react';
import { MainContainer } from '.';

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) =>
    typeof padding === 'string' ? padding : `${padding}px`};
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 20%);
  transform: translate(-50%, -50%);
  ${({ width, height }: Partial<ModalProps>) => css`
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
  `}
`;

export interface ModalProps {
  modalType: 'default' | 'warning';
  children?: ReactNode;
  width: number | string;
  height: number | string;
  padding: number | string;
  visible: boolean;
  clickAway?: boolean;
  onClose: () => void;
}

const Modal = ({
  children,
  width = 500,
  height = 500,
  visible = false,
  padding = 0,
  clickAway = false,
  onClose,
  ...props
}: ModalProps) => {
  const ref = useClickAway(() => {
    if (onClose && clickAway) {
      onClose();
    }
  });

  const [el, setEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    setEl(() => document.querySelector('#main-container'));
  }, []);
  useEffect(() => {
    if (el) document.body.appendChild(el);
    return () => {
      if (el) document.body.removeChild(el);
    };
  }, [el]);

  if (!el) return null;
  return createPortal(
    <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <MainContainer paddingWidth={24}>
        <ModalContainer
          width={width}
          height={height}
          padding={padding}
          ref={ref}
          {...props}
        >
          {children}
        </ModalContainer>
      </MainContainer>
    </BackgroundDim>,
    el
  );
};

export default Modal;
