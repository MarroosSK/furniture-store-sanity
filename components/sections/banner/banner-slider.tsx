"use client";

import Image from "next/image";

import { urlFor } from "@/lib/sanity";
import { BannerI } from "@/types/types";
import Slider from "react-slick";
const BannerSlider = ({ banners }: { banners: BannerI[] }) => {
  const settings = {
    pauseOnHover: false,
    draggable: false,
    speed: 700,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 576,
        settings: {},
      },
    ],
  };

  return (
    <Slider {...settings}>
      {banners?.map((item: any) => (
        <div key={item?._id} className="bg-black">
          <Image
            src={urlFor(item.image).url()}
            alt="banner image"
            width={2000}
            height={2000}
            className="w-full h-[100vh] object-cover opacity-50"
          />
          <div className="w-full h-40 bg-gradient-to-t from-gray-600 to-transparent absolute bottom-0 z-20" />
        </div>
      ))}
    </Slider>
  );
};

export default BannerSlider;
