import Tab, { TabProps } from '@components/domains/Tab';

export default {
  title: 'Component/domains/Tab',
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
  return <Tab {...args} leftText="참여한 이벤트" rightText="내가 쓴 리뷰" />;
};

export const Values = (args: TabProps) => {
  return (
    <Tab
      {...args}
      leftText="참여한 이벤트"
      rightText="내가 쓴 리뷰"
      isLeftFocused={false}
    />
  );
};
