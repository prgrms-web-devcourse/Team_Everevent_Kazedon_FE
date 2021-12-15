import { Success } from '@components/domains';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/domains/Success',
  component: Success,
} as ComponentMeta<typeof Success>;

const Template: ComponentStory<typeof Success> = (args) => (
  <Success {...args} />
);

export const Register = Template.bind({});
Register.args = {
  text: {
    successMessage: '가입이 완료됐습니다!',
    buttonText: '로그인 하러 가기',
  },
  onClick: () => {},
};
export const Owner = Template.bind({});
Owner.args = {
  text: {
    successMessage: '전환이 완료됐습니다!',
    buttonText: '전환된 내 가게 보러가기',
  },
  onClick: () => {},
};
