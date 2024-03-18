"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./header-scroll.css";
import SearchModal from "./search-modal";
import SidebarMenu from "./sidebar-menu";
import { Button } from "./ui/button";

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
        <Link
          href={"/"}
          className="hidden md:flex  flex-1 items-center gap-x-2  text-3xl"
        >
          Furniture<span className="text-white">.COM</span>
        </Link>

        <div className="inline-flex items-center gap-0 md:gap-2">
          <Button
            className={cn(
              `hidden md:flex bg-transparent hover:bg-transparent text-white  rounded-none  hover:font-medium  justify-center items-center px-12 
               hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500`
            )}
          >
            <SearchModal />
          </Button>
          <Link
            href={"/shop"}
            className={cn(
              `w-16 h-[70px] rounded-md  flex-col gap-1 text-black   overflow-x-hidden group cursor-pointer relative flex hover:font-medium  justify-center items-center px-12 
         hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500 `,
              pathname === "/shop" && "text-grey-950 underline"
            )}
          >
            <Store className="mr-2 h-6 w-6" />
          </Link>
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
