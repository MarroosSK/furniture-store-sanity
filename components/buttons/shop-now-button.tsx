import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ShopNowButton = ({
  title,
  href,
  classes,
}: {
  title: string;
  href: string;
  classes: string;
}) => {
  return (
    <Button
      asChild
      className={cn(
        "border  p-6 bg-transparent hover:bg-primary/15 hover:scale-125 transition-all ease-in rounded-full",
        classes
      )}
    >
      <Link href={href}>{title}</Link>
    </Button>
  );
};

export default ShopNowButton;
