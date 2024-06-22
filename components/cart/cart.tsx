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
import { resetCart } from "@/redux/eshopSlice";
import { motion } from "framer-motion";

//stripe
import { loadStripe } from "@stripe/stripe-js";

import { RootState } from "@/redux/store";
import { StoreProductProps } from "@/types/types";
import { useToast } from "../ui/use-toast";
import CartItem from "./cart-item";
import { ResetButton } from "../buttons/reset-button";
import Price from "../price";
import { DrawOutlineButton } from "../buttons/draw-button";
import ShopNowButton from "../buttons/shop-now-button";

const Cart = () => {
  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const data = useSelector((state: RootState) => state.eshop);
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    let price = 0;
    data &&
      data.productData.map((item: StoreProductProps) => {
        price += item?.price * item?.myQuantity;
        return price;
      });
    setTotalAmt(price);
  }, [data]);

  const handleReset = () => {
    dispatch(resetCart());
  };

  // Stripe payment

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const createCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch(
      "https://furniture-store-sanity.vercel.app/api/checkout",
      {
        method: "POST",
        headers: { "Content-Type": "appication/json" },
        body: JSON.stringify({
          items: data.productData,
        }),
      }
    );
    const stripeData = await response.json();
    console.log(stripeData);

    if (response.ok) {
      stripe?.redirectToCheckout({ sessionId: stripeData.id });
    }
  };

  return (
    <div className="w-full mt-7">
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
                  title: "Cart has been cleared!",
                  description: "Your cart is now empty.",
                });
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {data && data.productData?.length > 0 ? (
        <div className="w-full h-full">
          <div className="rounded-md w-full h-20 bg-[#f5f7f7] text-primeColor hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {data &&
              data.productData.map((item: StoreProductProps) => (
                <div className="rounded-md" key={item?._id}>
                  <CartItem item={item} />
                </div>
              ))}
          </div>
          <ResetButton onClick={() => setIsConfirmOpen(true)}>
            Reset cart
          </ResetButton>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="rounded-md w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">
                Cart summary
              </h1>
              <div>
                <p className="flex items-center justify-between border-[1px] shadow-md border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal{" "}
                  <span>
                    <Price amount={totalAmt} />
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] shadow-md border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    <Price amount={0} />
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] shadow-md py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    <Price amount={totalAmt} />
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <DrawOutlineButton onClick={createCheckout}>
                  Proceed to Checkout
                </DrawOutlineButton>
              </div>
            </div>
          </div>
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
              Your Shopping Cart is empty.
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
  );
};

export default Cart;
