import React from 'react';
import HeaderText, { HeaderTextProps } from '@components/atoms/HeaderText';

export default {
  title: 'Component/atoms/HeaderText',
  Component: HeaderText,
  argTypes: {
    level: {
      name: 'level',
      defaultValue: 1,
      options: [1, 2, 3, 4],
      control: {
        type: 'radio',
      },
    },
    children: {
      name: 'text',
      defaultValue: 'HeaderText!',
      type: { name: 'string', require: true },
      control: {
        type: 'text',
      },
    },
    marginBottom: {
      name: 'marginBottom',
      defaultValue: 0,
      control: {
        type: 'range',
        min: 0,
        max: 50,
      },
    },
  },
};

const Template = (args: HeaderTextProps) => (
  <div>
    <HeaderText {...args} />
    <span>Content!</span>
  </div>
);

export const Default = Template.bind({});
