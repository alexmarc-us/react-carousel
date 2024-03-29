import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Carousel from './components/Carousel';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => <Carousel cards={['1','2','3','4']}/>,
};