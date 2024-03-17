import axios from "axios";

export const createReview = async ({
  productId,
  reviewText,
  user,
  userRating,
}: any) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "review",
          user: user,
          product: {
            _type: "reference",
            _ref: productId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://xs874m0i.api.sanity.io/v2024-03-14/data/mutate/production`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_KEY!}`,
      },
    }
  );

  return data;
};
