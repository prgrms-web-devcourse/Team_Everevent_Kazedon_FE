import TabButton, { TabButtonProps } from '@components/atoms/TabButton';
import Common from '../styles';

export default {
  title: 'Component/atoms/TabButton',
  component: 'TabButton',
  argTypes: {
    size: {
      name: 'size',
      defaultValue: 160,
      control: { type: 'number' },
    },
    color: {
      name: 'color',
      control: { type: 'color' },
    },
    width: {
      name: 'width',
      control: { type: 'number' },
    },
  },
};

export const Default = (args: TabButtonProps) => {
  return <TabButton {...args}>참여한 이벤트</TabButton>;
};

export const Values = (args: TabButtonProps) => {
  return (
    <>
      <TabButton {...args} isLeft isLeftFocused>
        참여한 이벤트
      </TabButton>
      <TabButton {...args} isLeft={false} isLeftFocused={false}>
        내가 쓴 리뷰
      </TabButton>
    </>
  );
};
