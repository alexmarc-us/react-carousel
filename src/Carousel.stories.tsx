import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Carousel from './components/Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Example/Carousel', // Specify the path in the storybook UI
  component: Carousel,
  argTypes: {
    addCards: { control: 'boolean' },
    editableCards: { control: 'boolean' },
    initialCards: { control: 'array' },
    removableCards: { control: 'boolean' },
    visibleCardCount: { control: 'number' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    addCards: false,
    editableCards: false,
    initialCards: ['1', '2', '3', '4'],
    removableCards: false,
    visibleCardCount: 3,
  },
  render: (args) => <Carousel {...args} />,
};
