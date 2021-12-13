import Tab, { TabProps } from '@components/domain/Tab';

export default {
  title: 'Component/domain/Tab',
  component: 'Tab',
  argTypes: {
    size: {
      name: 'size',
      defaultValue: 320,
      control: { type: 'number' },
    },
    color: {
      name: 'color',
      control: { type: 'color' },
    },
    isLeftFocused: {
      name: 'isLeftFocused',
      control: { type: 'boolean' },
    },
  },
};

export const Default = (args: TabProps) => {
  return <Tab {...args} />;
};

export const Values = (args: TabProps) => {
  return (
    <>
      <Tab {...args} />
      <Tab {...args} isLeftFocused={false} />
    </>
  );
};
