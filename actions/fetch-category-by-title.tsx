import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

export const productQuery = groq`*[_type == 'product']{
    ...,
    category[]->{title}
  }`;

export const productDataAll = async () => {
  const productData = await client.fetch(productQuery, {
    enableDataCaching: false,
  });
  return productData;
};
