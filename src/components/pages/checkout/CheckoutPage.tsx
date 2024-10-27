"use client";
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Button } from '@/components/ui/button';



const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: convertToSubcurrency(amount, convertToSubcurrency(amount)),
            })
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
     
    },[amount]);



    const handelSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setLoading(true); 
        if (!stripe || !elements) {
            return;
        }
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/checkout_course/${amount}/success`,
                // return_url: `${window.location.origin}/success`,
            },
        });
        if(error){
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }
        else{
            // return_url: `http://localhost:3000/checkout_course/${amount}/fild`,
            setErrorMessage
        }

        setLoading(false); 

    }


    if (!clientSecret || !stripe || !elements){
        return <div>
            loading
        </div>
    }

    return (
        <form onSubmit={handelSubmit} >
            {clientSecret&& <PaymentElement />}
            {errorMessage&& <div>{errorMessage}</div>}

            <Button type="submit" disabled={!stripe || loading} className="mt-8 w-full bg-btn-authColor rounded-2xl py-6 text-white gap-1">
                {loading ? 'جاري الدفع...' : `ادفع $ ${amount}`}
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
    );
};

export default CheckoutPage;