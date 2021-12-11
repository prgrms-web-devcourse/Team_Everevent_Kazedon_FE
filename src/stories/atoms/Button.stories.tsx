import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button from '@components/atoms/Button';

export default {
  title: 'Component/atoms/Button',
  component: Button,
  argTypes: {
    buttonType: {
      defaultValue: 'primary',
      options: ['primary', 'warning', 'confirm'],
      control: { type: 'inline-radio' },
    },
    fontSize: {
      control: { type: 'range', min: 11, max: 24 },
    },
    bold: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    display: {
      defaultValue: 'inline-block',
      options: ['inline', 'inline-block', 'block'],
      control: { type: 'inline-radio' },
    },
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
    color: {
      control: { type: 'color' },
    },
    border: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    borderRadius: {
      defaultValue: 15,
      control: { type: 'number' },
    },
    padding: {
      defaultValue: 10,
      control: { type: 'number' },
    },
    reversal: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = { ...Default.args, children: 'Primary', buttonType: 'primary' };

export const Warning = Template.bind({});
Warning.args = { ...Warning.args, children: 'Warning', buttonType: 'warning' };

export const Confirm = Template.bind({});
Confirm.args = { ...Confirm.args, children: 'Confirm', buttonType: 'confirm' };
