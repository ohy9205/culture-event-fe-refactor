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
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MultiCarousel = ({ children }: Props) => {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      itemClass="p-2"
      centerMode={true}
    >
      {children}
    </Carousel>
  );
};

export default MultiCarousel;
