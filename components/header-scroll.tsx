"use client";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  Heart,
  LucideIcon,
  Menu,
  Search,
  ShoppingCart,
  Store,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SidebarMenu from "./sidebar-menu";
import { Button } from "./ui/button";
import SearchModal from "./search-modal";
import "./header-scroll.css";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

interface navLinksI {
  icon: LucideIcon;
  title: string;
  href: string;
}
const navbarLinks: navLinksI[] = [
  {
    icon: Store,
    title: "Shop",
    href: "/shop",
  },
];

const HeaderScroll = () => {
  const data = useSelector((state: any) => state.eshop);
  const wishlistData = useSelector((state: any) => state.wishlist);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 85) {
        headerRef?.current?.classList.add("sticky__header");
      } else {
        headerRef?.current?.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  return (
    <header
      ref={headerRef}
      className="hidden w-full bg-black  h-28 p-6  text-white"
    >
      <nav className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2">
        {/* <Menu /> */}
        <SidebarMenu />
        <Link href={"/"} className="flex flex-1 items-center gap-x-2  text-3xl">
          Furniture<span className="text-white">.COM</span>
        </Link>

        <div className="hidden md:inline-flex items-center gap-2">
          <Button
            className={cn(
              `bg-transparent hover:bg-transparent text-white  rounded-none flex hover:font-medium  justify-center items-center px-12 
               hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500`
            )}
          >
            <SearchModal />
          </Button>
          {navbarLinks.map((navLink, index: number) => (
            <Link
              href={navLink.href}
              key={index}
              className={cn(
                `flex hover:font-medium  justify-center items-center px-12 
               hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500 `,
                pathname === navLink.href && "text-grey-950 underline"
              )}
            >
              <navLink.icon className="mr-2 h-6 w-6" />
            </Link>
          ))}
          <Link
            href={"/wishlist"}
            className={cn(
              `w-16 h-[70px] rounded-md  flex-col gap-1 text-white   overflow-x-hidden group cursor-pointer relative flex hover:font-medium  justify-center items-center px-12 
         hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500 `,
              pathname === "/wishlist" && "text-grey-950 underline"
            )}
          >
            <Heart className="mr-2 h-6 w-6" />

            <Badge
              variant="outline"
              className="absolute top-1 right-2 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold"
            >
              {wishlistData && wishlistData.productData
                ? wishlistData.productData?.length
                : 0}
            </Badge>
          </Link>
          <Link
            href={"/cart"}
            className={cn(
              `w-16 h-[70px] rounded-md  flex-col gap-1 text-white   overflow-x-hidden group cursor-pointer relative flex hover:font-medium  justify-center items-center px-12 
         hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500 md:border-r-[2px] border-r-gray-400 duration-200 last:border-r-0`,
              pathname === "/cart" && "text-grey-950 underline"
            )}
          >
            <ShoppingCart className="mr-2 h-6 w-6" />

            <Badge
              variant="outline"
              className="absolute top-1 right-2 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold"
            >
              {data && data.productData ? data.productData?.length : 0}
            </Badge>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderScroll;
