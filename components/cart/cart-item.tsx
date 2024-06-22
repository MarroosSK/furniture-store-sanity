"use client";

import Image from "next/image";

import Link from "next/link";

import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";

import { urlFor } from "@/lib/sanity";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/redux/eshopSlice";
import { X } from "lucide-react";

import { StoreProductProps } from "@/types/types";
import Price from "../price";
import { Button } from "../ui/button";

interface Props {
  item: StoreProductProps;
}

const CartItem = ({ item }: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  return (
    <div className="rounded-md shadow-sm w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4 ml-4">
        <X
          onClick={() => {
            dispatch(deleteProduct(item._id));
            toast({
              title: "Deleted",
              description: "Product got deleted from Cart!",
            });
          }}
          className="text-red-500 hover:text-red-700 cursor-pointer duration-300"
        />
        <Link href={`/product/${item?.slug?.current}`}>
          <Image
            src={urlFor(item?.image[0]).url()}
            alt="product image"
            width={50}
            height={50}
            className="w-32 h-32 object-contain"
          />
        </Link>
        <h1 className="font-semibold">{item?.title.substring(0, 20)}</h1>
      </div>
      <div className="col-span-5 md:col-span-3 flex items-center justify-center md:justify-between py-4 md:py-0 px-0 md:px-4 lg:px-0">
        <p className="flex w-1/3 items-center text:sm md:text-lg font-semibold">
          <Price amount={item?.price} />
        </p>
        <div className="flex w-1/3 items-center gap-6  text:sm md:text-lg">
          <Button
            onClick={() => {
              dispatch(decreaseQuantity(item));
              toast({
                title: "Removed 1",
                description: "Product got deleted from Cart!",
              });
            }}
            className="w-6 h-6   text:sm md:text-lg flex items-center justify-center  cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-500"
            disabled={item.myQuantity === 1}
          >
            -
          </Button>
          <p>{item?.myQuantity}</p>
          <Button
            onClick={() => {
              dispatch(increaseQuantity(item));
              toast({
                title: "Added 1",
                description: "Product got added to Cart!",
              });
            }}
            className="w-6 h-6   text:sm md:text-lg flex items-center justify-center  cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-500"
            disabled={item.myQuantity === item.quantity}
          >
            +
          </Button>
        </div>
        <div className="hidden sm:flex w-1/3  items-center  font-bold  text:sm md:text-lg">
          <p>${item.myQuantity * item.price}</p>
        </div>
      </div>

      <p className="pl-2 h-[40px] flex  w-[250px] sm:hidden items-center justify-center font-bold text-center  text:sm md:text-lg">
        Total: ${item.myQuantity * item.price}
      </p>
    </div>
  );
};

export default CartItem;
