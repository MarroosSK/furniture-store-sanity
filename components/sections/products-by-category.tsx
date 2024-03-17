import { ProductProps } from "@/types/types";
import Container from "../container";
import Heading from "../heading";
import SingleProduct from "./single-product";

interface Props {
  products: ProductProps[];
  title?: string;
}

const ProductsByCategory = ({ products, title }: Props) => {
  return (
    <Container className="w-full pb-20">
      <Heading heading={title} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products?.map((item) => (
          <SingleProduct key={item?._id} product={item} bg="#ffffff" />
        ))}
      </div>
    </Container>
  );
};

export default ProductsByCategory;
