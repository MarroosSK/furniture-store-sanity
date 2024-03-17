"use client";

import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface FilterContextType {
  pickedBrand: string;
  setPickedBrand: React.Dispatch<React.SetStateAction<string>>;
  pickedStatus: string;
  setPickedStatus: React.Dispatch<React.SetStateAction<string>>;
  pickedPrice: number;
  setPickedPrice: React.Dispatch<React.SetStateAction<number>>;
  pickedCategory: string;
  setPickedCategory: React.Dispatch<React.SetStateAction<string>>;
  resetFilter: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

export const FilterContext = createContext<FilterContextType | null>(null);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within a FilterContextProvider"
    );
  }
  return context;
};

export const FilterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  const [pickedBrand, setPickedBrand] = useState("");
  const [pickedStatus, setPickedStatus] = useState("");
  const [pickedPrice, setPickedPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [pickedCategory, setPickedCategory] = useState("all");

  const resetFilter = () => {
    setPickedPrice(1000);
    setPickedCategory("all");
    setPickedBrand("");
    setPickedStatus("");
    setSearchQuery("");
  };

  const handleSearch = () => {
    router.push("/shop");
  };

  const value: FilterContextType = {
    pickedBrand,
    setPickedBrand,
    pickedStatus,
    setPickedStatus,
    pickedPrice,
    setPickedPrice,
    pickedCategory,
    setPickedCategory,
    resetFilter,
    searchQuery,
    setSearchQuery,
    handleSearch,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
