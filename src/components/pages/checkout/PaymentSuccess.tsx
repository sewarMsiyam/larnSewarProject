"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsPayment"

type CheckoutFormProps = {
    token: string;
};
export default function PaymentSuccess({ token }: CheckoutFormProps) {
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get('payment_intent');
    const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');


    return (

              <TabsContent value="cardS">
                    <div className="mt-8 p-8 bg-green-50 border border-green-400 text-green-700 rounded-lg">
                            {/* <p className="text-lg text-dark text-center font-bold my-5">
                                شكرا على الدفع 🌹, تم حجز درس خصوصي عند المعلم  , <br/>
                                سيتم التواصل معك من قبل المعلم على الواتساب و يرجى الالتزام بمواعيد الدرس الخصوصي التي اخترتها 😊😊😊😊
                            </p> */}
                            <p className="text-lg text-dark text-center font-bold my-5">
                                شكرا على الدفع 🌹, جاري العمل على تفعيل الكورس الخاص بك , <br/>
                                سيتم التواصل معك من قبل فريقنا على الواتساب و يرجى الالتزام بمواعيد الكورس المحددة من قبل المعلم 😊😊
                </p>
                
               payment_intent  {payment_intent}

<br />
                payment_intent_client_secret {payment_intent_client_secret}
                    </div>
        </TabsContent>
      
    );
}
