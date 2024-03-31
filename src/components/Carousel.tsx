import React, { useEffect, useState, useRef, useMemo, ReactNode } from 'react';

import Card from './Card';
import Arrow from './Arrow';
import './Carousel.css';

export interface CarouselProps {
  addCards?: boolean;
  editableCards?: boolean;
  initialCards: string[];
  removableCards?: boolean;
  // TODO: Feature toggling via props
  // visible cards
};

// TODO: JSDocs for all functions
function Carousel(props: CarouselProps) {
  const {
    addCards = false,
    editableCards = false,
    initialCards = ['1', '2', '3', '4'],
    removableCards = false,
  } = props;

  const [cards, setCards] = useState<any[]>(initialCards);
  const [targetCard, setTargetCard] = useState<number>(1);
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

  useEffect(() => {
    // Out of upper bounds - reset to the start.
    if (targetCard > (2 * cards.length)) {
      scrollCardToStart(`.card:nth-of-type(${cards.length})`);
      setTargetCard(cards.length + 1);
      return;
    }

    // Out of upper bounds - reset to the middle.
    if (targetCard <= 0) {
      scrollCardToStart(`.card:nth-of-type(${1 + cards.length})`);
      setTargetCard(cards.length);
      return;
    }

    // In-bounds - smooth scroll to the target.
    scrollCardToStart(`.card:nth-of-type(${targetCard})`, 'smooth')

  }, [targetCard]);

  // Render three sets of cards to enable infinite effect.
  function renderCards(): ReactNode {
    return useMemo(() => Array(3).fill(cards.map((card, index) => (
      <Card
        content={card}
        handleEdit={editableCards ? (e) => handleEditCard(e, index) : undefined}
        handleRemove={removableCards ? (e) => handleCardRemove(e, index) : undefined}
        handleAdd={addCards ? (e) => handleCardAdd(e, index) : undefined}
      />
    ))).flat(), [cards]);
  };

  return (
    <section className="carousel">
      <Arrow direction="left" onClick={() => setTargetCard(targetCard - 1)} />
      <div className="card-container" ref={cardContainer}>
        {renderCards()}
      </div>
      <Arrow direction="right" onClick={() => setTargetCard(targetCard + 1)} />
    </section>
  );
};

export default Carousel;