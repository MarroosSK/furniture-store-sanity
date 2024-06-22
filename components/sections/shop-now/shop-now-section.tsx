import bannerImg from "@/assets/furniBanner.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ShopNowSection = () => {
  return (
    <div className="relative">
      <Image
        src={bannerImg}
        alt="banner image"
        className="w-full h-[300px] object-cover"
      />
      <Button
        asChild
        className="text-xl font-bold w-[200px] h-auto absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  p-4 rounded-lg text-white border border-white bg-primary/70  hover:bg-primary/40 "
      >
        <Link href={"/shop"}>Shop now</Link>
      </Button>
    </div>
  );
};

export default ShopNowSection;
