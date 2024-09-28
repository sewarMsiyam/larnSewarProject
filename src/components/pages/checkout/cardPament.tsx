"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { TabsContent } from "@/components/ui/tabsPayment";
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '');

export default function CheckoutCard() {
    const searchParams = useSearchParams();
    const session = useSession();
    const id = searchParams.get('id');
    const token = (session?.data?.user as { authToken?: string | null })?.authToken;

//     const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     setError(null);

//         try {
//             const response = await fetch('https://sewaar.net/api/v1/checkout/checkout_course', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     course_id: id,
//                     payment_way_id: paymentWayId,
//                 }),
//             });

//             console.log('id sewar=' + id)
//             if (!response.ok) {
//                 throw new Error('خطأ أثناء إعداد الجلسة');
//             }

//             const sessionData = await response.json();

//             if (stripe && sessionData.id) {
//                 const result = await stripe.redirectToCheckout({ sessionId: sessionData.id });

//                 if (result.error) {
//                     console.error(result.error.message);
//                 }
//             } else {
//                 console.error('لا توجد جلسة دفع صالحة.');
//             }
//         } catch (error) {
//             console.error('حدث خطأ:', error);
//         } finally {
//             setLoading(false);
//         }
     };

    return (
        <TabsContent value="card">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2 mt-8">
                    <Label htmlFor="nameCard">الاسم على البطاقة</Label>
                    <div className="relative">
                        <Input
                            id="nameCard"
                            type="text"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder=""
                            required
                        />
                    </div>
                </div>
                <div className="grid gap-2 mt-8">
                    <Label htmlFor="cardNumber">الرقم على البطاقة</Label>
                    <div className="relative">
                        <Input
                            id="cardNumber"
                            type="text"
                            className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder=""
                            required
                        />
                    </div>
                </div>
                <div className="flex w-full gap-5 mt-8">
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                        <div className="relative">
                            <Input
                                id="expiryDate"
                                type="text"
                                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                    <div className="grid gap-2 w-1/2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                            <Input
                                id="cvv"
                                type="text"
                                className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>
                </div>
                <Button type="submit" className="mt-8 w-full bg-btn-authColor rounded-2xl py-6 text-white gap-1">
                    {loading ? 'انتظر...' : 'ادفع'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 25 25" fill="none">
                        <g clipPath="url(#clip0_516_4347)">
                            <path d="M8.42761 13.305L13.7916 18.669L12.3776 20.083L4.59961 12.305L12.3776 4.52698L13.7916 5.94098L8.42761 11.305L20.5996 11.305V13.305H8.42761Z" fill="#ffffff" />
                        </g>
                        <defs>
                            <clipPath id="clip0_516_4347">
                                <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 -1 24.5996 24.3051)" />
                            </clipPath>
                        </defs>
                    </svg>
                </Button>
            </form>
        </TabsContent>
    );
}
