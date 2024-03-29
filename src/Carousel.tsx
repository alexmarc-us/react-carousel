import React from "react";

export interface CarouselProps {
  label: string;
}

const Carousel = (props: CarouselProps) => {
  return <div>{props.label}</div>;
};

export default Carousel;