import Cart from "@/components/cart";
import Container from "@/components/container";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartPage = () => {
  return (
    <Container className="mt-16">
      <div className="flex flex-col   pb-10">
        <div className="mt-8 flex flex-col gap-y-2">
          <h2 className="text-2xl text-primeColor font-bold">Cart</h2>
          <div>
            <Link href="/" className="flex items-center gap-x-2">
              <ArrowLeft />
              back
            </Link>
          </div>
        </div>
        <Cart />
      </div>
    </Container>
  );
};

export default CartPage;
