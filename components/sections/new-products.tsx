"use client";

import Slider from "react-slick";
import NewStuffProduct from "./single-product";
import Container from "../container";
import ArrowNext from "../arrow-next";
import ArrowPrev from "../arrow-prev";
import { ProductProps } from "@/types/types";

interface Props {
  products: ProductProps[];
}

const NewProductsSlider = ({ products }: Props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <Container className="-mt-20">
      <div>
        <Slider {...settings}>
          {products?.map((item: any) => (
            <div key={item?._id} className="border-none px-2">
              <NewStuffProduct product={item} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default NewProductsSlider;
