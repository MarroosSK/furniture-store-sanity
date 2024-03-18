"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { ChangeEvent, useContext, useState } from "react";

import { FilterContext } from "@/context/filter-context";
import { cn } from "@/lib/utils";
import {
  Heart,
  LucideIcon,
  Menu,
  Search,
  ShoppingCart,
  Store,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";

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
  {
    icon: Heart,
    title: "Wishlist",
    href: "/wishlist",
  },
  {
    icon: ShoppingCart,
    title: "Cart",
    href: "/cart",
  },
];

const SidebarMenu = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();
  const filterContext = useContext(FilterContext);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            {" "}
            <Link
              href={"/"}
              className="flex flex-1 items-center gap-x-2  text-3xl"
            >
              Furniture.COM
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 grid items-start gap-2 sticky top-[50px] overflow-hidden">
          <div className="my-5 relative w-full inline-flex  h-10 text-base text-primeColor border-[1px] border-black items-center gap-2 justify-between px-6 rounded-md">
            <Input
              type="text"
              placeholder="Search  products here"
              className="flex-1 h-full outline-none  border-none bg-transparent placeholder:text-gray-600"
              value={filterContext?.searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                filterContext?.setSearchQuery(e.target.value)
              }
            />

            <Search
              className="w-5 h-5 cursor-pointer"
              onClick={filterContext?.handleSearch}
            />
          </div>
          {navbarLinks.map((navLink, index: number) => (
            <motion.div
              key={navLink.title}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4 + index / 10,
              }}
              onClick={() => setSheetOpen(false)}
            >
              <Link href={navLink.href}>
                <span
                  className={cn(
                    "group flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === navLink.href ? "bg-accent" : "bg-transparent"
                  )}
                >
                  <navLink.icon className="mr-2 h-4 w-4 text-primary" />
                  <span>{navLink.title}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMenu;
