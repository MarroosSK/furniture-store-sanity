import bannerImg from "@/assets/furniBanner.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const HomeBanner = () => {
  return (
    <div className="relative">
      <Image
        src={bannerImg}
        alt="banner image"
        className="w-full h-[300px] object-cover"
      />
      <Button
        asChild
        className="text-xl font-bold w-[200px] h-auto absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2  p-4 rounded-lg text-white border border-white bg-indigo-500/70  hover:bg-indigo-700/70 "
      >
        <Link href={"/shop"}>BestSellers</Link>
      </Button>
    </div>
  );
};

export default HomeBanner;
