"use client";

import { useContext, useEffect, useState } from "react";

import { ArrowLeft, Loader2 } from "lucide-react";

import { productsCategory } from "@/actions/fetch-categories";
import { productDataAll } from "@/actions/fetch-category-by-title";
import FilterMenu from "@/components/filter-menu";
import { FilterContext } from "@/context/filter-context";
import Link from "next/link";
import SearchInput from "@/components/search-input";
import { DrawOutlineButton } from "@/components/buttons/draw-button";
import SingleProductCard from "@/components/single-product-card";

const ShopPage = () => {
  const [productCategory, setProductCategory] = useState([]);
  //hydratation fix
  const [isLoaded, setIsLoaded] = useState(false);

  const filterContext = useContext(FilterContext);
  const [filteredData, setFilteredData] = useState([]);

  let filteredProducts = filteredData.filter((item: any) => {
    const filterByQuery = filterContext?.searchQuery.toLowerCase();
    const filterByCategory =
      filterContext?.pickedCategory === "all" ||
      item.category.some(
        (cat: any) => cat.title === filterContext?.pickedCategory
      );
    const filterByBrand =
      filterContext?.pickedBrand === "" ||
      item.brand.toLowerCase() === filterContext?.pickedBrand.toLowerCase();
    const filterByStatus =
      filterContext?.pickedStatus === "" ||
      item.status === filterContext?.pickedStatus.toLowerCase();
    const filterByPrice =
      filterContext?.pickedPrice === 0 ||
      item.price <= filterContext?.pickedPrice!;

    const matchesQuery = item.title.toLowerCase().includes(filterByQuery);

    return (
      filterByCategory &&
      filterByBrand &&
      filterByStatus &&
      filterByPrice &&
      matchesQuery
    );
  });

  //categoryData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productsCategory();
        setProductCategory(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);
  //productsData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productDataAll();
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="container">
      <div className="mt-16 flex items-center justify-between pb-10">
        <div className="mt-8">
          <SearchInput />
        </div>
        <div className="mt-8 flex flex-col gap-y-2">
          {isLoaded ? (
            <FilterMenu productData={filteredData} category={productCategory} />
          ) : (
            <Loader2 className="animate-spin" />
          )}
          <DrawOutlineButton onClick={filterContext?.resetFilter}>
            reset x
          </DrawOutlineButton>
        </div>
      </div>
      {isLoaded ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {filteredProducts.map((item: any) => (
            <SingleProductCard key={item?._id} product={item} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="flex items-center justify-center px-auto h-full">
              <h1>No product found</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="flex  mx-auto flex-col justify-center items-center max-w-[500px] h-[500px] p-4 py-8    gap-4  rounded-md">
          <Loader2 className="animate-spin" />{" "}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
