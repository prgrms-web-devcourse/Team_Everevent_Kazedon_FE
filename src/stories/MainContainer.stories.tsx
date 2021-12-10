import React from 'react';
import MainContainer from '@components/atoms/MainContainer';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/atoms/MainContainer',
  component: MainContainer,
  argTypes: {
    paddingWidth: {
      name: 'paddingWidth',
      defaultValue: 24,
      control: { type: 'range', min: 0, max: 100 },
    },
    paddingHeight: {
      name: 'paddingHeight',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 50 },
    },
  },
} as ComponentMeta<typeof MainContainer>;

const Template = (args: ComponentStory<typeof MainContainer>) => (
  <MainContainer {...args}>MainContainer!</MainContainer>
);

export const Default = Template.bind({});
