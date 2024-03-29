import React, { useState } from "react";

export interface CarouselProps {
  label: string;
}

const Carousel = (props: CarouselProps) => {
  const [cards, setCards] = useState([]);

  // TODO: Add new card.
  const handleCardAdd = (card = {}) => {};

  // TODO: Remove existing card.
  const handleCardRemove = (cardIndex = -1) => {};

  // TODO: Modify existing cards.
  const editCard = (cardChanges = {}) => {};

  // TODO: Update state to show selected card.
  const handlePositionChange = (diff = 0) => {
    /**
     * TODO: Moving forward or backward through the carousel should create an &quot;infinite
        scroll&quot; effect (e.g. clicking next starts over slide 1 - clicking back on slide 1 moves
        back to slide 4, etc.)
     */
  };

  // TODO: Render a Carousel component for desktop.
  // TODO: Able to click arrow buttons to move forward and backward through the slide show.
  return (
    <div>{props.label}</div>
  );
};

export default Carousel;