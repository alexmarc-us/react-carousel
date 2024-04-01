import React from "react";
import "./Card.css";

export interface CardProps {
  content: string;
  visibleCardCount: number;
  handleAdd? (e:any): void;
  handleEdit? (e:any): void;
  handleRemove? (e:any): void;
}

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