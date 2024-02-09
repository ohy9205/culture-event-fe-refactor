"use client";

import Carousel, { CarouselProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type Props = {
  children: React.ReactNode;
  options?: Omit<CarouselProps, "responsive" | "children">;
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

const MultiCarousel = ({ children, options }: Props) => {
  return (
    <Carousel {...options} responsive={responsive}>
      {children}
    </Carousel>
  );
};

export default MultiCarousel;
