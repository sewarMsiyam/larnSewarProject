// app/api/create-payment-intent/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  const { amount } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: 'usd',
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}