import { client } from "@/lib/sanity";

export const fetchBannerData = async () => {
  const query = `
    *[_type == 'noBanner'] {
      _id,
      image,       
    } | order(_createdAt asc)`;

  const data = await client.fetch(query);
  return data;
};
