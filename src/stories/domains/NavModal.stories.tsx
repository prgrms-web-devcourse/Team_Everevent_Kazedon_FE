import { ComponentMeta } from '@storybook/react';
import { NavModal, NavModalInner } from '@components/domains/NavModal';
import { useState } from 'react';

export default {
  title: 'Component/domains/NavModal',
  component: NavModal,
} as ComponentMeta<typeof NavModal>;

export const User = () => {
  const [visible, setVisible] = useState(false);
  const onClose = (): void => {
    setVisible(() => false);
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>Show User NavModal</button>
      <NavModal visible={visible} onClose={onClose}>
        <NavModalInner />
      </NavModal>
    </>
  );
};

export const Owner = () => {
  const [visible, setVisible] = useState(false);
  const onClose = (): void => {
    setVisible(() => false);
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>Show Owner NavModal</button>
      <NavModal visible={visible} onClose={onClose}>
        <NavModalInner />
      </NavModal>
    </>
  );
};
