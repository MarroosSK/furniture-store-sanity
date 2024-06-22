"use client";

import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="container flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-4xl font-bold">Something went wrong</h2>
        <p>Please, try again later</p>
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

export default CancelPage;
