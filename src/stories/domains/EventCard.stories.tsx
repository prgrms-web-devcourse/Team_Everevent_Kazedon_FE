import React from 'react';
import EventCard from '@components/domains/EventCard';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/domains/EventCard',
  component: EventCard,
  argTypes: {
    width: {
      name: 'width',
      defaultValue: 375,
      control: { type: 'range', min: 300, max: 600 },
    },
    idx: {
      name: 'idx',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 20 },
    },
  },
} as ComponentMeta<typeof EventCard>;

export const Default: ComponentStory<typeof EventCard> = (args) => {
  const data = {
    eventId: 'D4J398QF759HF394',
    name: '오후 6시 이전 생맥주 400...',
    expiredAt: '20211208',
    marketName: '오비맥주 광진점',
    likeCount: 329,
    reviewCount: 72,
    like: false,
    remainingParticipants: 7,
    pictureUrl: '',
  };

  return <EventCard {...args} eventData={data} />;
};
