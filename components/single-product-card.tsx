"use client";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { addToCart } from "@/redux/eshopSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { addToWishlist, deleteFromWishlist } from "@/redux/wishlistSlice";
import { ProductProps } from "@/types/types";
import { Fullscreen, Heart, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";

interface Props {
  product: ProductProps;
  bg?: string;
}

const SingleProductCard = ({ product, bg }: Props) => {
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
            <p className="bg-primeColor px-4 py-1 text-white bg-primary/45 flex justify-center items-center text-sm font-semibold duration-300 cursor-pointer rounded-md">
              New
            </p>
          </div>
        )}
        {product?.status === "bestseller" && (
          <div className="absolute top-2 right-2 z-20">
            <p className="bg-primeColor px-4 py-1 text-white bg-primary flex justify-center items-center text-sm font-semibold duration-300 cursor-pointer rounded-md">
              Bestseller
            </p>
          </div>
        )}
        <div className={`relative ${bg}`}>
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
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
                "bg-primary/55 text-white px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-primary/55  duration-200",
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
              className="bg-primary/55 text-white px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-primary/55 duration-200"
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
                className="bg-primary/55 text-white px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-primary/55  duration-200"
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
                className="bg-primary/55 text-white px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-primary/55  duration-200"
              >
                <Heart className=" " />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 px-4">
        <div className="flex flex-col items-center justify-between">
          <h2 className="text-lg text-primary font-bold">{product?.title}</h2>
          <div className="flex items-center gap-2">
            <p className="text-red-400 text-sm line-through">
              ${product?.oldprice}
            </p>
            <p className="font-bold text-xl text-primary">${product?.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
