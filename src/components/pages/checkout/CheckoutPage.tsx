"use client";
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Button } from '@/components/ui/button';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'error'>('pending');

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount:convertToSubcurrency(amount),
            })
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('حدث خطأ في إعداد عملية الدفع');
        });
    },[amount]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/checkout_course/payment-success`,
                },
            });


            //  toast.success("تم شراء الكورس بنجاح");
            if (error) {
                setErrorMessage(error.message);
                setPaymentStatus('error');
            } 
            // else if (paymentIntent && paymentIntent.status === 'succeeded') {
            //     setPaymentStatus('success');
            // }
        } catch (error) {
            setErrorMessage('حدث خطأ أثناء عملية الدفع');
            setPaymentStatus('error');
        } finally {
            setLoading(false);
        }
    };


    if (paymentStatus === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-4">
                <p className="text-lg text-dark text-center font-bold">
                    شكرا على الدفع 🌹, جاري العمل على تفعيل الكورس الخاص بك , <br />
                    سيتم التواصل معك من قبل فريقنا على الواتساب و يرجى الالتزام بمواعيد الكورس المحددة من قبل المعلم 😊😊
                </p>
            </div>
        );
    }


    if (!clientSecret || !stripe || !elements){
        return <div>
            loading
        </div>
    }

    return (
        <form onSubmit={handleSubmit} >
            {clientSecret&& <PaymentElement />}
            {errorMessage&& <div>{errorMessage}</div>}
            <ToastContainer />
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