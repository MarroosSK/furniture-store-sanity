"use client";
import React, { ChangeEvent, useContext } from "react";
import { Input } from "./ui/input";
import { FilterContext } from "@/context/filter-context";

const SearchInput = () => {
  const filterContext = useContext(FilterContext);
  return (
    <>
      <Input
        type="text"
        placeholder="Type product name..."
        className="flex-1 h-full outline-none  border-black bg-transparent placeholder:text-gray-600"
        value={filterContext?.searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          filterContext?.setSearchQuery(e.target.value)
        }
      />
    </>
  );
};

export default SearchInput;
