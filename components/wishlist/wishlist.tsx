"use client";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { urlFor } from "@/lib/sanity";
import { resetCart } from "@/redux/eshopSlice";
import { deleteFromWishlist, resetWishlist } from "@/redux/wishlistSlice";
import { motion } from "framer-motion";
import { Fullscreen, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RootState } from "@/redux/store";
import { useToast } from "../ui/use-toast";
import { ResetButton } from "../buttons/reset-button";
import ShopNowButton from "../buttons/shop-now-button";

const Wishlist = () => {
  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const wishlistData = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetWishlist());
  };

  return (
    <div>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleReset();
                toast({
                  variant: "default",
                  title: "Wishlist has been cleared!",
                  description: "Your Wishlist is now empty.",
                });
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        {wishlistData && wishlistData.productData?.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
            {wishlistData.productData.map((wishedItem: any) => (
              <div
                key={wishedItem._id}
                className="w-full relative group  border bg-white rounded-md p-4 hover:shadow-lg duration-200 shadow-primary/45   overflow-hidden group"
              >
                <div className="w-full h-80 flex items-center justify-center bg-white overflow-hidden">
                  <div className={`relative `}>
                    <Link href={`/product/${wishedItem?.slug?.current}`}>
                      <Image
                        src={urlFor(wishedItem?.image[0]).url()}
                        alt="product image"
                        width={700}
                        height={700}
                        className="w-72 h-72 object-contain"
                      />
                    </Link>
                    <div className="abosute bottom-0 flex items-center gap-5 justify-center translate-y-[110%] group-hover:-translate-y-2 transition-transform duration-300">
                      <button
                        onClick={() => {
                          dispatch(deleteFromWishlist(wishedItem));
                          toast({
                            variant: "default",
                            title: "Item removed!",
                            description: "Item has been Removed from Wishlist.",
                          });
                        }}
                        className="bg-primary/55 text-white px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-primary/55  duration-200"
                      >
                        <span>
                          <X color="red" />
                        </span>
                      </button>

                      <Link
                        href={`/product/${wishedItem?.slug?.current}`}
                        className="bg-primary/55 text-white px-2 py-2 text-xs rounded-full flex items-center gap-1 hover:bg-primary/55  duration-200"
                      >
                        <span>
                          <Fullscreen />
                        </span>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <ResetButton onClick={() => setIsConfirmOpen(true)}>
              Reset Wishlist
            </ResetButton>
          </div>
        ) : (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="  pb-20"
          >
            <div className="flex  mx-auto flex-col justify-center items-center max-w-[500px] h-[500px] p-4 py-8    gap-4  rounded-md">
              <h1 className="text-xl font-bold uppercase">
                Your Wishlist is empty.
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Check out latest furniture in our store.
              </p>
              <ShopNowButton
                title={"Shop now"}
                href={"/shop"}
                classes="border-black text-primary"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
