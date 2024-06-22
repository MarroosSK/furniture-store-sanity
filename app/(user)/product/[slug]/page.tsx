import { getSingleProductData } from "@/actions/fetch-single-product";
import ProductInfoWrapper from "@/components/product-info/product-info-wrapper";
import { ProductProps } from "@/types/types";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const product: ProductProps = await getSingleProductData(params.slug);

  return <ProductInfoWrapper product={product} />;
};

export default SinglePage;
