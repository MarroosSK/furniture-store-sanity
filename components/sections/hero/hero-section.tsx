import React from "react";
import { BannerI } from "@/types/types";
import { HeroSectionCTA } from "./hero-CTA";

import dynamic from "next/dynamic";
import HeroSkeleton from "@/components/hero-skeleton";

// Dynamic render of client data
const HeroSlider: any = dynamic(() => import("./hero-slider"), {
  ssr: false,
  loading: () => <HeroSkeleton />,
});

const HeroSection = ({ banners }: { banners: BannerI[] }) => {
  return (
    <div className="relative">
      <HeroSlider banners={banners} />
      <div className="flex flex-col items-center gap-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="mt-10 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white">
            New Products Everyday
          </h1>
        </div>
        <HeroSectionCTA />
      </div>
    </div>
  );
};

export default HeroSection;
