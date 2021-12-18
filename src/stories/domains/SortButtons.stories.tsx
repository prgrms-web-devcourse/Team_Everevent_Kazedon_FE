import React from 'react';
import SortButtons, {
  buttonArrType,
  SortButtonsProps,
} from '@components/domains/SortButtons';

export default {
  title: 'Component/domains/SortButtons',
  component: SortButtons,
  argTypes: {
    width: {
      name: 'width',
      defaultValue: 200,
      control: { type: 'range', min: 50, max: 500 },
    },
  },
};

const Template = (args: SortButtonsProps) => {
  /* eslint-disable no-console */
  const buttonArr = [
    [
      '좋아요 순',
      () => {
        console.log('추천순');
      },
    ],
    [
      '종료일 순',
      () => {
        console.log('등록순');
      },
    ],
    [
      '최신 순',
      () => {
        console.log('마감순');
      },
    ],
  ] as buttonArrType[];
  return <SortButtons {...args} buttonArr={buttonArr} />;
};

export const Default = Template.bind({});
