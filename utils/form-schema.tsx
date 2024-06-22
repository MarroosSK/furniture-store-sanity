import * as z from "zod";

export const formSchema = z.object({
  productId: z.string(),
  user: z.string().min(3, {
    message: "Username should have at least 3 characters.",
  }),
  reviewText: z.string().min(3, {
    message: "Review must be at least 3 characters.",
  }),
  userRating: z.coerce
    .number()
    .min(1, {
      message: "Rating can't be less than 1.",
    })
    .max(5, { message: "Rating can't be greater than 5." }),
});
