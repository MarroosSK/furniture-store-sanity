import { PortableText } from "@portabletext/react";

import { getSingleProductData } from "@/actions/fetch-single-product";
import Container from "@/components/container";
import ProudctInfo from "@/components/product-info";
import { RichText } from "@/components/rich-text";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductProps } from "@/types/types";
import Link from "next/link";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const product: ProductProps = await getSingleProductData(params.slug);

  console.log(product);

  return (
    <Container className="mt-16 my-10">
      <div className="flex flex-col   pb-10">
        <div className="mt-8">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href={"/"}>Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    {" "}
                    <Link href={"/shop"}>Shop</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <ProudctInfo product={product} />

        <PortableText value={product?.body} components={RichText} />
      </div>
    </Container>
  );
};

export default SinglePage;
export const dynamic = "force-dynamic";
