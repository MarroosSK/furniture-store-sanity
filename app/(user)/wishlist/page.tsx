"use client";

import Container from "@/components/container";
import Wishlist from "@/components/wishlist";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const WishlistPage = () => {
  //hydratation fix
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Container className="mt-16">
      <div className="flex flex-col   pb-10">
        <div className="mt-8 flex flex-col gap-y-2">
          <h2 className="text-2xl text-primeColor font-bold">Wishlist</h2>
          <div>
            <Link href="/" className="flex items-center gap-x-2">
              <ArrowLeft />
              back
            </Link>
          </div>
        </div>
        {isLoaded ? (
          <Wishlist />
        ) : (
          <div className="flex  mx-auto flex-col justify-center items-center max-w-[500px] h-[500px] p-4 py-8    gap-4  rounded-md">
            <Loader2 className="animate-spin" />{" "}
          </div>
        )}
      </div>
    </Container>
  );
};

export default WishlistPage;
