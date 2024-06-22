"use client";

import { FilterContext } from "@/context/filter-context";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";

const SearchModal = () => {
  const filterContext = useContext(FilterContext);

  //hydratation fix
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Search className="mr-2 h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none shadow-none">
        <div className="my-5 relative w-full  inline-flex  h-15 text-base text-white border-[1px]  items-center gap-2 justify-between px-6 rounded-lg">
          <Input
            type="text"
            placeholder="Search products here"
            className="py-4 flex-1 h-full outline-none border-none bg-transparent placeholder:text-white"
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
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
