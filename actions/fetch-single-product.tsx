"use server";

import { client } from "@/lib/sanity";
import { groq } from "next-sanity";

export const getSingleProductData = async (slug: string) => {
  const query = groq`*[_type == 'product' && slug.current == "${slug}"][0]{
      ...
    }`;

  const data = await client.fetch(query, { enableDataCaching: false });
  return data;
};
