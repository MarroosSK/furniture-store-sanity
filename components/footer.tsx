import React from "react";
import Container from "./container";
import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <div className="w-full bg-[#F5F5F3]">
      <Container className="max-w-container mx-auto border-t-[1px] group">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <Copyright />
          </span>
          Copyright 2024 | Furniture.COM
          <span className="ml-1 font-medium group-hover:text-primeColor">
            created by Marroos
          </span>
        </p>
      </Container>
    </div>
  );
};

export default Footer;
