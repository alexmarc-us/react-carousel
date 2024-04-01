import React, { useEffect, useState, useRef, useMemo, ReactNode } from 'react';

import Card from './Card';
import Arrow from './Arrow';
import './Carousel.css';

export interface CarouselProps {
  addCards?: boolean;
  editableCards?: boolean;
  initialCards: string[];
  removableCards?: boolean;
  visibleCardCount?: number;
};

// TODO: JSDocs for all functions
function Carousel(props: CarouselProps) {
  const {
    addCards = false,
    editableCards = false,
    removableCards = false,
    visibleCardCount = 3,
    initialCards = Array.from({length: visibleCardCount + 1}, (_, i) => i + 1), // Fills the array with test cards.
  } = props;

  const [cards, setCards] = useState<any[]>(initialCards);
  const [targetCard, setTargetCard] = useState<number>(1); // Uses 1-based counting to align with "nth-of-type" selector.
  const cardContainer = useRef<HTMLDivElement>(null);

  function scrollCardToStart(selector: string, behavior: ScrollBehavior = 'instant') {
    let container;
    if (cardContainer !== null && cardContainer.current !== null) {
      container = cardContainer.current;
    } else {
      throw 'Error: cardContainer not found.'
    }

    container.querySelector<HTMLElement>(selector)?.scrollIntoView({ behavior, inline: 'start' });
  };

  function handleCardAdd(e: React.FormEvent<HTMLInputElement>, cardIndex: number) {
    setCards(cards.toSpliced(cardIndex + 1, 0, 'new'));
  };

  function handleCardRemove(e: React.FormEvent<HTMLInputElement>, cardIndex: number) {
    setCards(cards.toSpliced(cardIndex, 1));
  };

  function handleEditCard(e: React.FormEvent<HTMLInputElement>, cardIndex: number) {
    const target = e.target as HTMLElement;
    let content = target.innerText;
    // Empty values in contentEditable elements cause rendering glitches. U+200E is an 'invisible' character.
    if (content.length === 0 || content === '\n') content = '‎';
    setCards(cards.toSpliced(cardIndex, 1, content));
  };

  function handleArrowClick(change: number) {
    const newTargetCard = targetCard + change;

    // Out of upper bounds - reset to the start.
    if (newTargetCard > cards.length + 1) {
      scrollCardToStart(`.card:nth-of-type(1)`);
      setTargetCard(2);
      return;
    }

    // Out of lower bounds - reset to the middle.
    if (newTargetCard <= 0) {
      scrollCardToStart(`.card:nth-of-type(${cards.length + 1})`);
      setTargetCard(cards.length);
      return;
    }

    setTargetCard(newTargetCard);
  }

  useEffect(() => {
    scrollCardToStart(`.card:nth-of-type(${targetCard})`, 'smooth')
  }, [targetCard]);

  // Render multiple sets of cards to enable infinite effect.
  function renderCards(): ReactNode {
    return useMemo(() => Array(2).fill(cards.map((card, index) => (
      <Card
        content={card}
        handleEdit={editableCards ? (e) => handleEditCard(e, index) : undefined}
        handleRemove={removableCards ? (e) => handleCardRemove(e, index) : undefined}
        handleAdd={addCards ? (e) => handleCardAdd(e, index) : undefined}
        visibleCardCount={visibleCardCount}
      />
    ))).flat(), [cards]);
  };

  return (
    <section className="carousel">
      <Arrow direction="left" onClick={() => handleArrowClick(-1)} />
      <div className="card-container" ref={cardContainer}>
        {renderCards()}
      </div>
      <Arrow direction="right" onClick={() => handleArrowClick(+1)} />
    </section>
  );
};

export default Carousel;