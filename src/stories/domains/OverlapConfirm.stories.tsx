import { OverlapConfirm } from '@components/domains';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/domains/OverlapConfirm',
  component: OverlapConfirm,
} as ComponentMeta<typeof OverlapConfirm>;

const Template: ComponentStory<typeof OverlapConfirm> = (args) => (
  <OverlapConfirm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'email',
  error: false,
  placeholder: '이메일',
  onChange: () => {},
  onClick: () => {},
};
