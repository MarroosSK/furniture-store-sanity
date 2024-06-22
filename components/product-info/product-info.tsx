"use client";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "@/redux/eshopSlice";

import { addToWishlist, deleteFromWishlist } from "@/redux/wishlistSlice";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";

import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { ProductProps, ReviewI } from "@/types/types";
import Price from "../price";
import ProductInfoGallery from "./product-info-gallery";
import { useToast } from "../ui/use-toast";
import { AddButton } from "../buttons/add-button";
import Rating from "../rating";
import RatingModal from "../modals/rating-modal";

interface Props {
  product: ProductProps;
}
const ProudctInfo = ({ product }: Props) => {
  const { toast } = useToast();
  const wishlistData = useSelector((state: RootState) => state.wishlist);
  const shopData = useSelector((state: RootState) => state.eshop);
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState<ReviewI[]>([]);

  const disabledButton = shopData.productData.find(
    (item) => item.myQuantity === product.quantity
  );

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData: ReviewI[] = await client.fetch(
        `*[_type == "review" && product._ref == '${product._id}']`
      );
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [product]);

  return (
    <div className="mt-16 mb-4 bg-white">
      <div className="mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2">
          <ProductInfoGallery images={product?.image} />

          <div className="py-8">
            <div className="mb-2">
              <h2 className="text-4xl font-semibold">{product?.title}</h2>
              <p>{product?.brand}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <p className="text-lg font-normal text-red-500 line-through">
                  {product?.oldprice > 0 && (
                    <Price amount={product?.oldprice} />
                  )}
                </p>
                <Price
                  amount={product?.price}
                  className="text-xl text-primary font-bold"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {wishlistData &&
              wishlistData.productData.find(
                (item) => item._id === product._id
              ) ? (
                <AddButton
                  className="w-full group bg-white relative px-4 py-4 text-lg rounded-md  font-medium text-black-100 transition-colors duration-[400ms] hover:text-primary"
                  onClick={() => {
                    dispatch(deleteFromWishlist(product));
                    toast({
                      title: "Deleted from wishlist",
                      description: "Product deleted from wishlist!",
                    });
                  }}
                >
                  Remove from Wishlist
                </AddButton>
              ) : (
                <AddButton
                  className="w-full group bg-white relative px-4 py-4 text-lg rounded-md  font-medium text-black-100 transition-colors duration-[400ms] hover:text-primary"
                  onClick={() => {
                    dispatch(addToWishlist(product));
                    toast({
                      title: "Added to wishlist",
                      description: "Product added to wishlist!",
                    });
                  }}
                >
                  Add to Wishlist
                </AddButton>
              )}

              {disabledButton && <p>Out of Stock</p>}
              <AddButton
                className={cn(
                  "w-full group text-white bg-black relative px-4 py-4 text-lg rounded-md  font-medium  transition-colors duration-[400ms] ",
                  disabledButton && "hidden"
                )}
                onClick={() => {
                  dispatch(addToCart(product));
                  toast({
                    title: "Success",
                    description: "Product added to Cart!",
                  });
                }}
              >
                Add to Cart
              </AddButton>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {product?.description}
            </p>
            <div>
              <p>QT: {product?.quantity}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Reviews:</h3>
              {reviews.length === 0 && (
                <p className="mt-2">
                  There are no reviews for this product. Create one.
                </p>
              )}
              <div className="mb-2 max-h-[220px] overflow-y-scroll">
                {reviews.map((review: ReviewI) => (
                  <div
                    className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
                    key={review._id}
                  >
                    <div className="font-semibold mb-2 flex">
                      <p>{review.user}</p>
                      <div className="ml-4 flex items-center text-tertiary-light text-lg">
                        <Rating rating={review.userRating} />
                      </div>
                    </div>

                    <p>{review.text}</p>
                  </div>
                ))}
              </div>
              <RatingModal productId={product._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProudctInfo;
