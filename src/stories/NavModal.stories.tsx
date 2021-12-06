import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavModal } from '@components/domains/NavModal';
import { useState } from 'react';

export default {
  title: 'Component/domains/NavModal',
  component: NavModal,
} as ComponentMeta<typeof NavModal>;

const Template: ComponentStory<typeof NavModal> = () => {
  const [visible, setVisible] = useState(false);
  const onClose = (): void => {
    setVisible(() => false);
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>Show NavModal</button>
      <NavModal visible={visible} onClose={onClose} />
    </>
  );
};

export const Default = Template.bind({});
