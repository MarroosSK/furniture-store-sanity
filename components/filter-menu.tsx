"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useContext } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { FilterContext } from "@/context/filter-context";
import { cn } from "@/lib/utils";
import { CategoryI, ProductProps } from "@/types/types";
import { Settings2 } from "lucide-react";
import { DrawOutlineButton } from "./buttons/draw-button";
import { Button } from "./ui/button";

interface FilterProps {
  productData: ProductProps[];
  category: CategoryI[];
}

const FilterMenu = ({ productData, category }: FilterProps) => {
  const filterContext = useContext(FilterContext);
  const productBrand = Array.from(
    new Set(productData.map((item: ProductProps) => item.brand))
  );
  const productStatus = Array.from(
    new Set(productData.map((item: ProductProps) => item.status))
  );

  return (
    <Sheet>
      <SheetTrigger>
        <Button
          className={`rounded-full border border-black hover:bg-slate-100 bg-transparent text-black  text-lg flex  items-center justify-center gap-x-2 cursor-pointer`}
        >
          <Settings2 />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>
            {" "}
            <p className="text-3xl">Filter</p>
            <DrawOutlineButton onClick={filterContext?.resetFilter}>
              reset x
            </DrawOutlineButton>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 grid items-start gap-2 sticky top-[50px] overflow-hidden">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.4 + 5 / 10,
            }}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div>
                      Max: {filterContext?.pickedPrice}
                      <Slider
                        defaultValue={[1000]}
                        max={1000}
                        min={1}
                        step={1}
                        onValueChange={(val) =>
                          filterContext?.setPickedPrice(val[0])
                        }
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <div>
                    {category.map((cat: CategoryI) => (
                      <p
                        key={cat._id}
                        onClick={() =>
                          filterContext?.setPickedCategory(cat.title)
                        }
                        className={cn(
                          "hover:underline cursor-pointer",
                          cat.title === filterContext?.pickedCategory
                            ? "font-fold text-primary"
                            : ""
                        )}
                      >
                        {cat.title}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Brand</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div>
                      {productBrand?.map((item: string, index: number) => (
                        <p
                          key={index}
                          onClick={() => filterContext?.setPickedBrand(item)}
                          className={cn(
                            "hover:underline cursor-pointer",
                            item === filterContext?.pickedBrand
                              ? "font-fold text-primary"
                              : ""
                          )}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Status</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div>
                      {productStatus?.map((item: string, index: number) => (
                        <p
                          key={index}
                          onClick={() => filterContext?.setPickedStatus(item)}
                          className={cn(
                            "hover:underline cursor-pointer",
                            item === filterContext?.pickedStatus
                              ? "font-fold text-primary"
                              : ""
                          )}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterMenu;
