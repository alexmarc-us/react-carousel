import React from "react";
import "./Card.css";

export interface CardProps {
  index: number;
}

const Card = (props: CardProps) => {
  return (
    <article className="card">
      {props.index}
    </article>
  );
};

export default Card;