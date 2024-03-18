"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Heart, LucideIcon, Menu, ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

        <div className="mt-7 grid items-start gap-2 sticky top-[50px] overflow-hidden">
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
