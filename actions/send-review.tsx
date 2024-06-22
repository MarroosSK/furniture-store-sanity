"use server";

import { formSchema } from "@/utils/form-schema";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { createReview } from "./create-review";

export const sendReview = async (values: z.infer<typeof formSchema>) => {
  console.log(values);
  //validation on server so no one can manipulate fields
  const validateFields = formSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { productId, user, userRating, reviewText } = validateFields.data;
  try {
    await createReview({
      productId,
      reviewText,
      user,
      userRating,
    });
    revalidatePath(`/product/${productId}`);
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
