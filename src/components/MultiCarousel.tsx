"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {
  children: React.ReactNode;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
};

const MultiCarousel = ({ children }: Props) => {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      itemClass="p-2"
      centerMode={true}
    >
      {children}
    </Carousel>
  );
};

export default MultiCarousel;
