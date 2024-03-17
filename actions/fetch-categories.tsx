import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

export const productQuery = groq`*[_type == 'category']{
    ...
  }`;

export const productsCategory = async () => {
  const productData = await client.fetch(productQuery, {
    enableDataCaching: false,
  });
  return productData;
};
