import { urlFor } from "@/lib/sanity";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  console.log(process.env.STRIPE_SECRET_KEY!);

  try {
    const reqBody = await request.json();
    const { items } = await reqBody;
    console.log(items);

    const updatedItems = await items.map((item: any) => ({
      quantity: item.myQuantity,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description,
          images: [urlFor(item.image[0]).url()],
        },
      },
    }));
    console.log(updatedItems);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: updatedItems,
      mode: "payment",
      success_url:
        "https://furniture-store-sanity.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `https://furniture-store-sanity.vercel.app/cancel`,
    });
    return NextResponse.json({
      message: "Connection is alive",
      success: true,
      id: session.id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
