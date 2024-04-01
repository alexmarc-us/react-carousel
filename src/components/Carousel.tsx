import React, { useEffect, useState, useRef, useMemo, ReactNode } from 'react';

import Card from './Card';
import Arrow from './Arrow';
import './Carousel.css';

export interface CarouselProps {
  /**
   * Determines if the functionality to add new cards to the carousel is enabled.
   * @type {boolean}
   */
  addCards?: boolean;

  /**
   * Determines if the cards within the carousel can be edited.
   * @type {boolean}
   */
  editableCards?: boolean;

  /**
   * An array of strings representing the initial set of cards to be displayed in the carousel.
   * @type {string[]}
   */
  initialCards: string[];

  /**
   * Determines if the functionality to remove cards from the carousel is enabled.
   * @type {boolean}
   */
  removableCards?: boolean;

  /**
   * Specifies the number of cards visible at any given time in the carousel.
   * @type {number}
   */
  visibleCardCount?: number;
};

/**
 * Represents a carousel component with customizable card operations.
 * @param {CarouselProps} props - The properties passed to the carousel component.
 */
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

  /**
   * Scrolls the specified card to the start of the container.
   * @param {string} selector - The CSS selector for the target card.
   * @param {ScrollBehavior} [behavior='instant'] - The scroll behavior (e.g., 'smooth', 'instant').
   * @throws Will throw an error if the card container is not found.
   */
  function scrollCardToStart(selector: string, behavior: ScrollBehavior = 'instant') {
    let container;
    if (cardContainer !== null && cardContainer.current !== null) {
      container = cardContainer.current;
    } else {
      throw 'Error: cardContainer not found.'
    }

    container.querySelector<HTMLElement>(selector)?.scrollIntoView({ behavior, inline: 'start' });
  };

  /**
   * Adds a new card at the specified index.
   * @param {React.FormEvent<HTMLInputElement>} e - The event object.
   * @param {number} cardIndex - The index where the new card will be added as the next card.
   */
  function handleCardAdd(e: React.FormEvent<HTMLInputElement>, cardIndex: number) {
    setCards(cards.toSpliced(cardIndex + 1, 0, 'new'));
  };

  /**
   * Removes the card at the specified index.
   * @param {React.FormEvent<HTMLInputElement>} e - The event object.
   * @param {number} cardIndex - The index of the card to be removed.
   */
  function handleCardRemove(e: React.FormEvent<HTMLInputElement>, cardIndex: number) {
    setCards(cards.toSpliced(cardIndex, 1));
  };

  /**
   * Edits the card at the specified index with the provided content.
   * @param {React.FormEvent<HTMLInputElement>} e - The event object.
   * @param {number} cardIndex - The index of the card to be edited.
   */
  function handleEditCard(e: React.FormEvent<HTMLInputElement>, cardIndex: number) {
    const target = e.target as HTMLElement;
    let content = target.innerText;
    // Empty values in contentEditable elements cause rendering glitches. U+200E is an 'invisible' character.
    if (content.length === 0 || content === '\n') content = '‎';
    setCards(cards.toSpliced(cardIndex, 1, content));
  };

  /**
   * Handles the click event on an arrow button, updating the target card index.
   * @param {number} change - The change in index (positive for next, negative for previous).
   */
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

  /**
   * Uses an effect to scroll to the target card when its index changes.
   */
  useEffect(() => {
    scrollCardToStart(`.card:nth-of-type(${targetCard})`, 'smooth')
  }, [targetCard]);

  /**
   * Renders the cards in the carousel, duplicated for an infinite scrolling effect.
   * @returns {ReactNode} The cards to be displayed in the carousel.
   */
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