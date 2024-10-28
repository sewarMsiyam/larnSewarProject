"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Course } from '@/app/api/interfaces';
import { fetchOneToken } from '@/app/api/dataFetch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsPayment"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import CheckoutPage from '@/components/pages/checkout/CheckoutPage';

type CheckoutFormProps = {
    token: string;
};

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CardPament ({ token }: CheckoutFormProps){
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState<number>(0); 

   useEffect(() => {
    const fetchcourse = async () => {
        if (!id || !token) return;
        setLoading(true);
        try {
            const data = await fetchOneToken('checkout/courses', id, token);
            const cleanPrice = data.price.toString().replace(/[$,]/g, '');
            setAmount(cleanPrice);
        } catch (error) {
            console.error("Error fetching course data:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchcourse();
    }, [id, token]);


    if (loading) {
        return <>loading ... </>;
    }

    if (Number(amount) === 0) {
        return (
            <TabsContent value="card">
                <p className='mt-5 px-2 text-xl font-bold'>سعر الكورس 0 </p>
                <p className='mt-5 text-lg font-bold'></p>
            </TabsContent>
        );
    }


    return (
        <TabsContent value="card">
            <div className="mt-8">
                 <Elements stripe={stripePromise}
                options={{
                    mode: "payment",
                    amount: convertToSubcurrency(amount),
                    currency:"usd",
                }}>
                <CheckoutPage amount={amount} />
            </Elements>
            </div>          
        </TabsContent>
    );
};
