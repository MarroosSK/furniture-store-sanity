"use client";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { Heart, ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import SearchModal from "../modals/search-modal";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const Navbar = () => {
  const eshopData = useSelector((state: RootState) => state.eshop);
  const wishlistData = useSelector((state: RootState) => state.wishlist);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full bg-neutral-100  h-20     z-30">
      <nav className="h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2">
        <Link
          href={"/"}
          className="hidden md:flex flex-1 items-center  text-3xl font-bold text-primary"
        >
          Furniture<span className="text-black">.COM</span>
        </Link>

        <div className="inline-flex items-center gap-0 md:gap-2">
          <Button>
            <SearchModal />
          </Button>
          <Link
            href={"/wishlist"}
            className={cn(
              `relative w-16 h-[70px] flex text-primary/45  justify-center items-center`,
              pathname === "/wishlist" && "text-primary underline"
            )}
          >
            <Heart className="mr-2 h-6 w-6" />

            <Badge
              variant="outline"
              className="absolute top-1 right-2 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold"
            >
              {wishlistData && wishlistData.productData
                ? wishlistData.productData?.length
                : 0}
            </Badge>
          </Link>
          <Link
            href={"/cart"}
            className={cn(
              `relative w-16 h-[70px] flex text-primary/45  justify-center items-center`,
              pathname === "/cart" && "text-primary underline"
            )}
          >
            <ShoppingCart className="mr-2 h-6 w-6" />

            <Badge
              variant="outline"
              className="absolute top-1 right-2 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold"
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

export default Navbar;
