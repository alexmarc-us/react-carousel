import React, { useState, useRef } from "react";

import Card from "./Card";
import Arrow from "./Arrow";
import "./Carousel.css";

function moveItem (array: any[], from: number, to: number) {
  return array.splice(to, 0, ...array.splice(from, 1));
}

export interface CarouselProps {
  cards?: string[]
  // TODO: Feature toggling via props
  // editing
  // add
  // remove
  // starting cards
};

const Carousel = (props: CarouselProps) => {
  const [cards, setCards] = useState(props.cards || []);
  const cardContainer = useRef<HTMLDivElement>(null);

  // TODO: Add new card.
  const handleCardAdd = (card = {}) => {};

  // TODO: Remove existing card.
  const handleCardRemove = (cardIndex = -1) => {};

  // TODO: Modify existing cards.
  const editCard = (cardChanges = {}) => {};

  const handlePositionChange = (diff = 0) => {
    if (diff === 1) {
      const newCards = cards.slice(1);
      setCards(newCards.concat([cards[0]]));
    } else if (diff === -1) {
      const newCards = cards.slice(0, -1);
      setCards([cards[cards.length - 1]].concat(newCards));
    } else return;
  };

  return (
    <section className="carousel">
      <Arrow direction="left" onClick={() => handlePositionChange(-1)} />
      <div className="card-container" ref={cardContainer}>
        {  cards.map((card) => <Card key={card} index={card} />) }
      </div>
      <Arrow direction="right" onClick={() => handlePositionChange(1)} />
    </section>
  );
};

export default Carousel;