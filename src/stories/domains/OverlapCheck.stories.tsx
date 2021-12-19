import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import OverlapCheck from '@components/domains/OverlapCheck';
import { Text } from '@components/atoms';
import { css } from '@emotion/react';
import Common from '@styles/index';

export default {
  title: 'Component/domains/OverlapCheck',
  component: OverlapCheck,
  argTypes: {
    css: {
      defaultValue: { width: '280px' },
    },
  },
} as ComponentMeta<typeof OverlapCheck>;

const Template: ComponentStory<typeof OverlapCheck> = (args) => (
  <OverlapCheck {...args}>
    <Text
      size="micro"
      fontStyle={{ display: 'flex', justifyContent: 'center' }}
      block
      color={Common.colors.warning}
      css={css`
        margin-bottom: 8px;
      `}
    >
      이메일 중복입니다.
    </Text>
  </OverlapCheck>
);

export const Default = Template.bind({});
