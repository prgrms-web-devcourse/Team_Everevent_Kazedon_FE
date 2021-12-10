import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Textarea from '@components/atoms/Textarea';

export default {
  title: 'Component/atoms/Textarea',
  component: Textarea,
  argTypes: {
    width: {
      name: 'width',
      defaultValue: 'auto',
      control: { type: 'number' },
    },
    height: {
      name: 'height',
      defaultValue: 'auto',
      control: { type: 'number' },
    },
    error: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const Default = Template.bind({});
export const Error = Template.bind({});
Error.args = { ...Error.args, error: true };
