"use client";

import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import React, { useState } from "react";

const ProductInfoGallery = ({ images }: any) => {
  const [bigImg, setBigImg] = useState(images[0]);

  const handleSmallImgClick = (image: any) => {
    setBigImg(image);
  };
  return (
    <div className="flex  justify-between gap-x-2">
      <div className="flex flex-col  gap-y-2">
        {images.map((image: any, index: any) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
          >
            <Image
              width={200}
              height={200}
              alt="photo"
              src={urlFor(image).url()}
              className="h-[75px] w-[75px] object-cover object-center border border-gray-300"
              onClick={() => handleSmallImgClick(image)}
            />
          </div>
        ))}
      </div>
      <div className="flex-1">
        <Image
          src={urlFor(bigImg).url()}
          alt="product image"
          className="w-full h-full object-contain rounded-lg  border border-gray-300"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default ProductInfoGallery;
