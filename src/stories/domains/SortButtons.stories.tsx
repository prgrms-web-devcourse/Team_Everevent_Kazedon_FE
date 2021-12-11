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
      '추천순',
      () => {
        console.log('추천순');
      },
    ],
    [
      '등록순',
      () => {
        console.log('등록순');
      },
    ],
    [
      '마감순',
      () => {
        console.log('마감순');
      },
    ],
    [
      '좋아요순',
      () => {
        console.log('좋아요순');
      },
    ],
  ] as buttonArrType[];
  return <SortButtons {...args} buttonArr={buttonArr} />;
};

export const Default = Template.bind({});
