# React Carousel Component

The React Carousel component is a customizable carousel UI library designed for displaying cards of text in a React applications. It supports dynamic content management, allowing users to add, edit, and remove cards within the carousel.

## Features

- **Dynamic Content Management:** Add, edit, and remove cards with ease.
- **Smooth Navigation:** Navigate through the carousel using arrow buttons.
- **Customizable:** Control features such as card addition, removal, and editing to fit your project's needs.

## Demo
[demo.webm](https://github.com/alexmarc-us/react-carousel/assets/4584765/5b6cb665-7c84-4847-a11f-d21e344e69e6)

## Installation

The Carousel component is available as an npm package. To install, run the following command in your project directory:

```bash
npm install @alexmarc-us/react-carousel@1.0.0
```

This will add the React Carousel component to your project, allowing you to easily integrate it into your application.

## Usage

After installation, you can import and use the Carousel component in your React application as shown below:

```jsx
import React from 'react';
import Carousel from '@alexmarc-us/react-carousel';

const App = () => {
  const initialCards = ['Card 1', 'Card 2', 'Card 3']; // Example initial cards
  return (
    <div className="App">
      <Carousel initialCards={initialCards} />
    </div>
  );
}

export default App;
```

## Props

Customize the Carousel component using the following props:

- `addCards` (boolean): Enable the addition of new cards. Defaults to `false`.
- `editableCards` (boolean): Allow cards within the carousel to be edited. Defaults to `false`.
- `removableCards` (boolean): Enable the removal of cards. Defaults to `false`.
- `visibleCardCount` (number): Specify the number of cards visible at any time. Defaults to `3`.
- `initialCards` (string[]): Array of strings representing the initial content of the cards.

## Running Locally

To run the React Carousel component locally for development and testing purposes, follow these steps to get started:

### Setup

First, clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/alexmarc-us/react-carousel.git
cd react-carousel
```

### Install Dependencies

Inside the project directory, install the necessary dependencies by running:

```bash
npm i
```

This command installs all the dependencies listed in `package.json` required for the Carousel component and development environment.

### Testing with Storybook

The Carousel component uses Storybook for an isolated development environment and visual testing. To launch Storybook and interact with the component variations:

```bash
npm run storybook
```

After running the command, Storybook will start, and your default web browser should automatically open to the Storybook interface, typically at `http://localhost:6006/`. Here, you can view different states and configurations of the Carousel component, simulating how it behaves within an application.
