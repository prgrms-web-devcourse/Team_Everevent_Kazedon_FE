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
    display: {
      defaultValue: 'inline-block',
      options: ['inline-block', 'inline', 'block', 'flex'],
      control: { type: 'inline-radio' },
    },
    justifyContent: {
      defaultValue: 'center',
      options: ['center', 'flex-start', 'flex-end'],
      control: { type: 'inline-radio' },
    },
    alignItems: {
      defaultValue: 'center',
      options: ['center', 'flex-start', 'flex-end'],
      control: { type: 'inline-radio' },
    },
    color: {
      control: { type: 'color' },
    },
    border: {
      name: 'border',
      defaultValue: 'none',
      control: { type: 'text' },
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
