import React from "react";
import "./Card.css";

export interface CardProps {
  content: string;
  handleEdit? (e:any): void;
  handleRemove? (e:any): void;
}

const Card = (props: CardProps) => {
  return (
    <article 
      className="card" 
      contentEditable={!!props.handleEdit}
      suppressContentEditableWarning={true}
      onBlur={props.handleEdit}>
      {props.handleRemove && <button className="remove ripple" onClick={props.handleRemove}>x</button>}
      <p>{props.content}</p>
    </article>
  );
};

export default Card;