"use client";

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
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/rich-text";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import ProudctInfo from "./product-info";

const ProductInfoWrapper = ({ product }: { product: ProductProps }) => {
  //hydratation fix
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="container mt-16 my-10">
      {isLoaded ? (
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
      ) : (
        <div className="flex  mx-auto flex-col justify-center items-center max-w-[500px] h-[500px] p-4 py-8    gap-4  rounded-md">
          <Loader2 className="animate-spin" />{" "}
        </div>
      )}
    </div>
  );
};

export default ProductInfoWrapper;
