import { client } from "@/lib/sanity";

export const fetchProducts = async (status: string) => {
  const query = `
    *[_type == 'product' && status == '${status}'][] {
      ...       
    }`;

  const data = await client.fetch(query);
  return data;
};
