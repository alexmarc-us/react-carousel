import React from "react";
import "./Card.css";

export interface CardProps {
  /**
   * The content displayed on the card.
   * @type {string}
   */
  content: string;

  /**
   * The number of cards visible at any given time in the carousel, used to calculate the width of each card.
   * @type {number}
   */
  visibleCardCount: number;

  /**
   * Optional handler function for adding a card. If provided, an add button is displayed on the card.
   * @param {any} e - The event object.
   */
  handleAdd?: (e: any) => void;

  /**
   * Optional handler function for editing the card's content. If provided, the card's content becomes editable.
   * @param {any} e - The event object.
   */
  handleEdit?: (e: any) => void;

  /**
   * Optional handler function for removing the card. If provided, a remove button is displayed on the card.
   * @param {any} e - The event object.
   */
  handleRemove?: (e: any) => void;
}


/**
 * Represents a single card within a carousel, with optional functionality for adding, editing, and removing.
 * @param {CardProps} props - The properties passed to the card component.
 */
const Card = (props: CardProps) => {
  const {
    content,
    handleAdd,
    handleEdit,
    handleRemove,
    visibleCardCount,
  } = props;
  return (
    <article className="card" style={{width: `calc(${100 / visibleCardCount}% - 3rem)`}}>
      {handleRemove && <button className="remove" onClick={handleRemove}>x</button>}
      
      <p
        contentEditable={!!handleEdit} 
        suppressContentEditableWarning={true}
        onBlur={handleEdit && handleEdit}
        tabIndex={-1}>
          {content}
      </p>
        
      {handleAdd && <button className="add" onClick={handleAdd} tabIndex={-1}>+</button>}
    </article>
  );
};

export default Card;