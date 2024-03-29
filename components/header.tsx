"use client";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { Heart, ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import SearchModal from "./search-modal";
import SidebarMenu from "./sidebar-menu";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Header = () => {
  const eshopData = useSelector((state: RootState) => state.eshop);
  const wishlistData = useSelector((state: RootState) => state.wishlist);
  const pathname = usePathname();

  return (
    <header className="mt-10 absolute top-0 left-0 w-full bg-transparent  h-20     z-30">
      <nav className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2">
        {/* <Menu /> */}
        <SidebarMenu />
        <Link
          href={"/"}
          className="hidden md:flex flex-1 items-center gap-x-2  text-3xl"
        >
          Furniture<span className="text-black">.COM</span>
        </Link>

        <div className="inline-flex items-center gap-0 md:gap-2">
          <Button
            className={cn(
              `hidden md:flex bg-transparent hover:bg-transparent text-primary   rounded-none  hover:font-medium  justify-center items-center px-12 
               hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500`
            )}
          >
            <SearchModal />
          </Button>
          <Link
            href={"/shop"}
            className={cn(
              `w-16 h-[70px] rounded-md  flex-col gap-1    overflow-x-hidden group cursor-pointer relative flex hover:font-medium  justify-center items-center px-12 
         hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500 `,
              pathname === "/shop" && "text-indigo-500 underline"
            )}
          >
            <Store className="mr-2 h-6 w-6" />
          </Link>
          <Link
            href={"/wishlist"}
            className={cn(
              `w-16 h-[70px] rounded-md  flex-col gap-1   overflow-x-hidden group cursor-pointer relative flex hover:font-medium  justify-center items-center px-12 
         hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500 `,
              pathname === "/wishlist" && "text-indigo-500 underline"
            )}
          >
            <Heart className="mr-2 h-6 w-6" />

            <Badge
              variant="outline"
              className="absolute top-1 right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold"
            >
              {wishlistData && wishlistData.productData
                ? wishlistData.productData?.length
                : 0}
            </Badge>
          </Link>
          <Link
            href={"/cart"}
            className={cn(
              `w-16 h-[70px] rounded-md  flex-col gap-1   overflow-x-hidden group cursor-pointer relative flex hover:font-medium  justify-center items-center px-12 
         hover:underline underline-offset-4 decoration-[1px] hover:text-gray-500 md:border-r-[2px] border-r-gray-400 duration-200 last:border-r-0`,
              pathname === "/cart" && "text-indigo-500 underline"
            )}
          >
            <ShoppingCart className="mr-2 h-6 w-6" />

            <Badge
              variant="outline"
              className="absolute top-1 right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold"
            >
              {eshopData && eshopData.productData
                ? eshopData.productData?.length
                : 0}
            </Badge>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
