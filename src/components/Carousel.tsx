import React, { useEffect, useState, useRef, useMemo, ReactNode } from "react";

import Card from "./Card";
import Arrow from "./Arrow";
import "./Carousel.css";

function moveItem (array: any[], from: number, to: number) {
  return array.splice(to, 0, ...array.splice(from, 1));
}

export interface CarouselProps {
  initialCards: string[];
  editableCards?: boolean;
  removableCards?: boolean;
  // TODO: Feature toggling via props
  // add
  // visible cards
};

// TODO: JSDocs for all functions
function Carousel(props: CarouselProps) {
  const [cards, setCards] = useState<any[]>(props.initialCards || []);
  const [targetCard, setTargetCard] = useState<number>(1);
  const cardContainer = useRef<HTMLDivElement>(null);

  // TODO: Add new card.
  const handleCardAdd = (card = {}) => {};

  const handleCardRemove = (e: React.FormEvent<HTMLInputElement>, cardIndex: number = -1) => {
    setCards(cards.toSpliced(cardIndex, 1));
  };

  const handleEditCard = (e: React.FormEvent<HTMLInputElement>, cardIndex: number) => {
    const target = e.target as HTMLElement;
    let content = target.innerText;
    // Empty values in contentEditable elements cause rendering glitches. U+200E is an "invisible" character.
    if (content.length === 0 || content === '\n') content = '‎';
    setCards(cards.toSpliced(cardIndex, 1, content));
  };

  useEffect(() => {
    let container;
    if (cardContainer !== null && cardContainer.current !== null) {
      container = cardContainer.current;
    } else {
      throw 'Error: cardContainer not found.'
    }

    // Out of upper bounds - reset to the start.
    if (targetCard > (2 * cards.length)) {
      container.querySelector<HTMLElement>(`.card:nth-child(${cards.length})`)?.scrollIntoView({behavior: "instant", inline:"start"});
      setTargetCard(cards.length + 1);
      return;
    }
    
    // Out of upper bounds - reset to the middle.
    if (targetCard <= 0) {
      container.querySelector<HTMLElement>(`.card:nth-child(${1 + cards.length})`)?.scrollIntoView({behavior: "instant", inline:"start"});
      setTargetCard(cards.length);
      return;
    }

    // In-bounds - smooth scroll to the target.
    container.querySelector<HTMLElement>(`.card:nth-child(${targetCard})`)?.scrollIntoView({behavior: "smooth", inline:"start"});

  }, [targetCard]);

  // Render three sets of cards to enable infinite effect.
  function renderCards(): ReactNode {
    return useMemo(() => Array(3).fill(cards.map((card, index) => (
      <Card 
        content={card}
        handleEdit={props.editableCards ? (e) => handleEditCard(e, index) : undefined}
        handleRemove={props.removableCards? (e) => handleCardRemove(e, index) : undefined}
      />
    ))).flat(), [cards]);
  };

  return (
    <section className="carousel">
      <Arrow direction="left" onClick={() => setTargetCard(targetCard - 1)} />
      <div className="card-container" ref={cardContainer}>
        { renderCards() }
      </div>
      <Arrow direction="right" onClick={() => setTargetCard(targetCard + 1)} />
    </section>
  );
};

export default Carousel;