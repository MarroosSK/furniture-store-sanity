import React from "react";
import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full py-8">
      <div className="container max-w-container mx-auto  group">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <Copyright />
          </span>
          Copyright 2024 | Furniture.COM
          <span className="ml-1 font-medium group-hover:text-primeColor">
            created by Marroos
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
