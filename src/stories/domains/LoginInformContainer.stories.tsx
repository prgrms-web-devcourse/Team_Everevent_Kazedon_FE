import React from 'react';
import LoginInformContainer from '@components/domains/ControlModal/LoginInformContainer';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/domains/LoginInformContainer',
  component: LoginInformContainer,
  argTypes: {
    requestType: {
      name: 'requestType',
      defaultValue: '좋아요',
      type: 'text',
    },
  },
} as ComponentMeta<typeof LoginInformContainer>;

const Template: ComponentStory<typeof LoginInformContainer> = (args) => (
  <LoginInformContainer {...args} />
);

export const Default = Template.bind({});
