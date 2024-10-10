"use client";
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Label } from "@/components/ui/label"
import { fetchProfileData } from '@/app/api/dataFetch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsPayment"
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams ,  usePathname  } from 'next/navigation';
import DropZone from '@/components/ui/DropZone';
import { CreateCourseFun } from '@/app/api/dataFetch';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type CheckoutFormProps = {
    token: string;
};

interface FormData {
    course_id?: string | null;
    payment_way_id: string;
    payment_invoice_image: string | File;
    instructor_id?: string | null;
    from_time?: string;
    to_time?: string;
}

export default function CheckoutBank({ token }: CheckoutFormProps) {
    const t = useTranslations('HomePage');
    const [loading, setLoading] = useState<boolean>(true);
    const [description, setDescription] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const id = searchParams.get('id');
    const fromTime = searchParams.get('date');
    const toTime = searchParams.get('time');
    const isInstructorCheckout = pathname.includes('checkout_private');
    const [isOpen, setIsOpen] = useState(false);
const [paymentSuccess, setPaymentSuccess] = useState(false);




    const [formData, setFormData] = useState<FormData>({
        payment_way_id: '1',
        payment_invoice_image: "",

        
        course_id: isInstructorCheckout ? undefined : id,
        instructor_id: isInstructorCheckout ? id : undefined,

        from_time: fromTime || undefined,
        to_time: toTime || undefined,
    });

    const handleFileUpload = (file: File | null) => {
        if (file) {
            setFiles([file]);
            setFormData(prevData => ({
                ...prevData,
                payment_invoice_image: file
            }));
        } else {
            setFiles([]);
            setFormData(prevData => ({
                ...prevData,
                payment_invoice_image: ""
            }));
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                if (token) {    
                    const data = await fetchProfileData('checkout/payment_method/1' , token);
                    if (data && data.item) {
                        setDescription(data.item.description) 
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formDataToSend = new FormData();

            if (isInstructorCheckout) {
                formDataToSend.append('instructor_id', formData.instructor_id || '');
                formDataToSend.append('from_time', formData.from_time || '');
                formDataToSend.append('to_time', formData.to_time || '');
            } else {
                formDataToSend.append('course_id', formData.course_id || '');
            }

            formDataToSend.append('payment_way_id', formData.payment_way_id);
            if (formData.payment_invoice_image instanceof File) {
                formDataToSend.append('payment_invoice_image', formData.payment_invoice_image);
            }

            const endpoint = isInstructorCheckout ? 'checkout/checkout_instructor' : 'checkout/checkout_course';

            const result = await CreateCourseFun(endpoint, token, formDataToSend);
            if (result.status) {
                // setIsOpen(true);
                 setPaymentSuccess(true);
                if (isInstructorCheckout) {
                    toast.success("تم الدفع حجز معلم , ستواصل معك العلم بأقرب وقت ");
                } else {
                    toast.success("تم شراء الكورس بنجاح");
                }

                setFormData({
                    course_id: isInstructorCheckout ? undefined : id,
                    instructor_id: isInstructorCheckout ? id : undefined,
                    payment_way_id: '1',
                    payment_invoice_image: "",
                    from_time: fromTime || undefined,
                    to_time: toTime || undefined,
                });
                setFiles([]);
            }
        } catch (error: any) {
            console.error('Error submitting form:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
   const handleCancel = () => {
        setIsOpen(false);
    };
    return (
        <>
        <TabsContent value="bank">
                {paymentSuccess ? (
                    <div className="mt-8 p-8 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {isInstructorCheckout ? (
                            <p className="text-lg text-dark text-center font-bold my-5">
                                شكرا على الدفع 🌹, تم حجز درس خصوصي عند المعلم  , <br/>
                                سيتم التواصل معك من قبل المعلم على الواتساب و يرجى الالتزام بمواعيد الدرس الخصوصي التي اخترتها 😊😊😊😊
                            </p>
                        ) : (
                            <p className="text-lg text-dark text-center font-bold my-5">
                                شكرا على الدفع 🌹, جاري العمل على تفعيل الكورس الخاص بك , <br/>
                                سيتم التواصل معك من قبل فريقنا على الواتساب و يرجى الالتزام بمواعيد الكورس المحددة من قبل المعلم 😊😊
                            </p>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="payment_method" value="1" />
                        <div className="grid gap-2 mt-4">
                            <Label htmlFor="nameCard">الوصف</Label>
                            <div className="relative">
                                {description || ''}
                            </div>
                        </div>
                        <div className="grid gap-2 mt-8">
                            <Label htmlFor="nameCard">اضافة وصل الدفع </Label>
                            <div className="relative">
                                <DropZone
                                    onFileUpload={handleFileUpload}
                                    acceptedFileTypes={['image/*', 'application/pdf']}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="mt-8 w-full bg-btn-authColor rounded-2xl py-6 text-white gap-1">
                            {loading ? 'جاري الدفع...' : 'ادفع'}
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
                )}
            <ToastContainer />
        </TabsContent>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogContent>
                    <AlertDialogHeader className='flex flex-col items-center'>
                        <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            {isInstructorCheckout ? (
                                <p className="text-lg text-dark text-center font-bold my-5">
                                    شكرا على الدفع 🌹, تم حجز درس خصوصي عند المعلم  ,
                                    سيتم التواصل معك من قبل المعلم على الواتساب و يرجى الالتزام بمواعيد الدرس الخصوصي التي اخترتها 😊😊😊😊
                                </p>
                            ) : (
                                <p className="text-lg text-dark text-center font-bold my-5">
                                    شكرا على الدفع 🌹, جاري العمل على تفعيل الكورس الخاص بك ,
                                    سيتم التواصل معك من قبل فريقنا على الواتساب و يرجى الالتزام بمواعيد الكورس المحددة من قبل المعلم 😊😊
                                </p>
                            )}
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-full flex gap-2">
                        <AlertDialogAction className="before:ease relative overflow-hidden w-full btn-primary text-white font-medium py-2.5 px-6 md:px-3 lg:px-6 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-150">
                            اذهب للصفحة الشخصية
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}