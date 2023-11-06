"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {
  children: React.ReactNode;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 4,
  },
};

const MultiCarousel = ({ children }: Props) => {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      itemClass="w-1/4 p-2"
      centerMode={true}
    >
      {children}
    </Carousel>
  );
};

export default MultiCarousel;
