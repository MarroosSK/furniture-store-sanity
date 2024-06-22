"use client";

import { resetCart } from "@/redux/eshopSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const SucessPage = ({ searchParams }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    searchParams?.session_id && dispatch(resetCart());
  }, []);
  return (
    <div className="container flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-4xl font-bold">Your Payment was Accepted</h2>
        <p>Thank you for Shopping at Furniture.COM</p>
        <div className="flex items-center gap-x-5">
          <Link href={"/"}>
            <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SucessPage;
