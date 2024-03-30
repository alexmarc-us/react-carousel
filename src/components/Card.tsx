import React from "react";
import "./Card.css";

export interface CardProps {
  content: string;
  handleEdit? (e:any): void;
}

const Card = (props: CardProps) => {
  return (
    <article 
      className="card" 
      contentEditable={!!props.handleEdit}
      suppressContentEditableWarning={true}
      onBlur={props.handleEdit}>
      <p>{props.content}</p>
    </article>
  );
};

export default Card;