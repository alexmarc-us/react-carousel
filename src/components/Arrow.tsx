import React from "react";
import "./Arrow.css";

export interface ArrowProps {
  direction: "left" | "right";
  onClick: () => void
}

const Arrow = (props: ArrowProps) => {
  return (
    <button onClick={props.onClick} className="arrow">
      {props.direction === "left" ? "<" : ">"}
    </button>
  );
};

export default Arrow;