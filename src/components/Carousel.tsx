import React, { useState, useRef } from "react";

import Card from "./Card";
import Arrow from "./Arrow";
import "./Carousel.css";

function moveItem (array: any[], from: number, to: number) {
  return array.splice(to, 0, ...array.splice(from, 1));
}

export interface CarouselProps {
  // TODO: Feature toggling via props
  // editing
  // add
  // remove
  // starting cards
};

const Carousel = (props: CarouselProps) => {
  const [cards, setCards] = useState([1,2,3,4,5,6]);
  const cardContainer = useRef<HTMLDivElement>(null);

  // TODO: Add new card.
  const handleCardAdd = (card = {}) => {};

  // TODO: Remove existing card.
  const handleCardRemove = (cardIndex = -1) => {};

  // TODO: Modify existing cards.
  const editCard = (cardChanges = {}) => {};

  // TODO: Update state to show selected card.
  const handlePositionChange = (diff = 0) => {
    if (diff === 1) {
      const newCards = cards.slice(1);
      setCards(newCards.concat([cards[0]]));
    } else if (diff === -1) {
      const newCards = cards.slice(0, -1);
      setCards([cards[cards.length - 1]].concat(newCards));
    } else return;
    
    if (cardContainer !== null && cardContainer.current !== null) {
      cardContainer.current.querySelector('.card:nth-child(0)')?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
    /**
     * TODO: Moving forward or backward through the carousel should create an "infinite
        scroll" effect (e.g. clicking next starts over slide 1 - clicking back on slide 1 moves
        back to slide 4, etc.)
     */
  };

  // TODO: Render a Carousel component for desktop.
  // TODO: Able to click arrow buttons to move forward and backward through the slide show.
  return (
    <section className="carousel">
      <Arrow direction="left" onClick={() => handlePositionChange(-1)} />
      <div className="card-container" ref={cardContainer}>
        {  cards.map((card, index) => <Card key={card} index={card} />) }
      </div>
      <Arrow direction="right" onClick={() => handlePositionChange(1)} />
    </section>
  );
};

export default Carousel;