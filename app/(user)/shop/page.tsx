"use client";

import { useContext, useEffect, useState } from "react";

import Container from "@/components/container";
import NewStuffProduct from "@/components/sections/single-product";
import { ArrowLeft } from "lucide-react";

import { productsCategory } from "@/actions/fetch-categories";
import { productDataAll } from "@/actions/fetch-category-by-title";
import FilterMenu from "@/components/filter-menu";
import { FilterContext } from "@/context/filter-context";
import Link from "next/link";

const ShopPage = () => {
  const [productCategory, setProductCategory] = useState([]);

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

  console.log(filteredProducts);
  console.log(filteredData);
  console.log(productCategory);

  return (
    <Container>
      <div className="mt-16 flex items-center justify-between pb-10">
        <div className="mt-8 flex flex-col gap-y-2">
          <h2 className="text-2xl text-primary font-bold">Shop</h2>
          <div>
            <Link href="/" className="flex items-center gap-x-2">
              <ArrowLeft />
              back
            </Link>
          </div>
        </div>
        <FilterMenu productData={filteredData} category={productCategory} />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {filteredProducts.map((item: any) => (
          <NewStuffProduct key={item?._id} product={item} />
        ))}
        {filteredProducts.length === 0 && (
          <div className="flex items-center justify-center px-auto h-full">
            <h1>No product found</h1>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ShopPage;
