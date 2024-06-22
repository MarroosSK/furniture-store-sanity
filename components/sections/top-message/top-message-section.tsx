"use client";

import { MarqueI } from "@/types/types";
import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const marqueTexts: MarqueI[] = [
  {
    title: "48 hours Dispatch",
    subtitle: "Worldwide",
  },
  {
    title: "Hassle-Free Return",
    subtitle: "30 days no question return",
  },
];

const TopMessageSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % marqueTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Marquee className="py-2">
      <div key={currentIndex} className="mx-8 flex items-center gap-x-2">
        <p className="font-bold">{marqueTexts[currentIndex].title}</p>
        <p>{marqueTexts[currentIndex].subtitle}</p>
      </div>
    </Marquee>
  );
};

export default TopMessageSection;
