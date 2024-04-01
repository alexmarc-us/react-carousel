import React from "react";
import "./Arrow.css";

export interface ArrowProps {
  /**
   * The direction in which this arrow will navigate the carousel when clicked. Can be either "left" or "right".
   * @type {"left" | "right"}
   */
  direction: "left" | "right";

  /**
   * The function to be called when the arrow is clicked, typically used to change the current view of the carousel.
   */
  onClick: () => void;
};


/**
 * Represents an arrow button for navigating the carousel in a specified direction.
 * @param {ArrowProps} props - The properties passed to the arrow component.
 */
const Arrow = (props: ArrowProps) => {
  return (
    <button onClick={props.onClick} className="arrow" aria-label={props.direction === "left" ? "Navigate left" : "Navigate right"}>
      {props.direction === "left" ? "<" : ">"}
    </button>
  );
};

export default Arrow;