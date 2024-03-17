"use client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Clock, Fullscreen, Heart, ShoppingBag, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/eshopSlice";
import { ProductProps } from "@/types/types";
import { addToWishlist, deleteFromWishlist } from "@/redux/wishlistSlice";
import { useToast } from "../ui/use-toast";
import { shimmer, toBase64 } from "@/lib/image";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";

interface Props {
  product: ProductProps;
  bg?: string;
}

const SingleProduct = ({ product, bg }: Props) => {
  const { toast } = useToast();
  const wishlistData = useSelector((state: RootState) => state.wishlist);
  const shopData = useSelector((state: RootState) => state.eshop);
  const dispatch = useDispatch<AppDispatch>();
  //hydratation fix
  const [isLoaded, setIsLoaded] = useState(false);

  const disabledButton = shopData.productData.find(
    (item) => item.myQuantity === product.quantity
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }
  return (
    <div className="w-full relative group  border bg-white rounded-md p-4 hover:shadow-lg duration-200 shadow-gray-500  overflow-hidden group">
      <div className="w-full h-80 flex items-center justify-center bg-white overflow-hidden">
        {product?.status === "new" && (
          <div className="absolute top-2 right-2 z-20">
            <p className="bg-primeColor px-4 py-1 text-white bg-yellow-600 flex justify-center items-center text-sm font-semibold duration-300 cursor-pointer rounded-md">
              New
            </p>
          </div>
        )}
        {product?.status === "bestseller" && (
          <div className="absolute top-2 right-2 z-20">
            <p className="bg-primeColor px-4 py-1 text-white bg-green-600 flex justify-center items-center text-sm font-semibold duration-300 cursor-pointer rounded-md">
              Bestseller
            </p>
          </div>
        )}
        {product?.status === "special offer" && (
          <div className="absolute top-2 right-2 z-20 ">
            <div className="bg-primeColor px-4 py-1 text-white bg-indigo-600 flex justify-center items-center gap-x-2 text-sm font-semibold duration-300 cursor-pointer rounded-md">
              <Clock />
              limited
            </div>
          </div>
        )}
        <div className={`relative ${bg}`}>
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base65,${toBase64(
                shimmer(255, 280)
              )}`}
              src={urlFor(product?.image[0]).url()}
              alt="product image"
              width={700}
              height={700}
              className="w-72 h-72 object-contain"
            />
          </Link>
          <div className="abosute bottom-0 flex items-center gap-5 justify-center translate-y-[110%] group-hover:-translate-y-2 transition-transform duration-300">
            {disabledButton && <p>Out of Stock</p>}
            <button
              onClick={() => {
                dispatch(addToCart(product));
                toast({
                  title: "Success",
                  description: "Product got added to Cart!",
                });
              }}
              className={cn(
                "bg-white text-indigo-500 px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-gray-200  duration-200",
                disabledButton && "hidden"
              )}
            >
              Add to
              <span>
                <ShoppingBag />
              </span>
            </button>

            <Link
              href={`/product/${product?.slug?.current}`}
              className="bg-white text-indigo-500 px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-gray-200  duration-200"
            >
              <span>
                <Fullscreen />
              </span>
              View
            </Link>
            {wishlistData &&
            wishlistData.productData.find(
              (item) => item._id === product._id
            ) ? (
              <button
                onClick={() => {
                  dispatch(deleteFromWishlist(product));
                  toast({
                    title: "Deleted from Wishlist",
                    description: "Product got deleted from Wishlist!",
                  });
                }}
                className="bg-white text-indigo-500 px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-gray-200  duration-200"
              >
                <X color="red" />
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(addToWishlist(product));
                  toast({
                    title: "Added to Wishlist",
                    description: "Product got added to Wishlist!",
                  });
                }}
                className="bg-white text-indigo-500 px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-gray-200  duration-200"
              >
                <Heart className=" " />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-primary font-bold">
            {product?.title.substring(0, 15)}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-[#767676] text-xs line-through">
              ${product?.oldprice}
            </p>
            <p className="font-semibold">${product?.price}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#767676] text-sm">
            by{" "}
            <span className="font-semibold text-indigo-500">
              {product?.brand}
            </span>
          </p>
          <p>
            QT:{" "}
            <span className="font-semibold text-indigo-500">
              {product?.quantity}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
