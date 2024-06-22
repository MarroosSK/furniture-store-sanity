import SingleProductsCardSkeleton from "@/components/single-product-card-skeleton";

import { ProductProps } from "@/types/types";

interface Props {
  products: ProductProps[];
}

import dynamic from "next/dynamic";

// Dynamic render of client data
const SingleProductCard: any = dynamic(
  () => import("@/components/single-product-card"),
  {
    ssr: false,
    loading: () => <SingleProductsCardSkeleton />,
  }
);

const BestsellersSection = ({ products }: Props) => {
  return (
    <div id="new" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h3 className="text-3xl text-primary font-semibold pb-6">
          Bestsellers
        </h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products?.map((item) => (
            <SingleProductCard key={item?._id} product={item} bg="#ffffff" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellersSection;
