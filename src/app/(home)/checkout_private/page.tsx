import Breadcrumb from "@/components/ui/breadcrumbHome"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";
import CheckoutForm from "@/components/pages/checkout/form";
import InstructionPrivate from "@/components/pages/checkout/InstructionPrivate";

export default async function CheckoutCourse() {
    const session = await getServerSession(authOptions);

    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'تفاصيل الدفع', href: '/checkout_course/?id=', isActive: true }
    ]

    return (
        <>
            {session ? (
                <>
                    {/* <p>Welcome, {session.user?.name}</p>
                    <p>token, {session.user?.authToken}</p> */}

                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <div className="container my-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <CheckoutForm />
                            <InstructionPrivate />

                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center h-[80vh]">
                        <div className="container p-4 bg-white rounded-lg shadow-md">
                            <div className="container py-10">
                                <p className="text-2xl text-center font-bold mb-4"> لحجز معلم  <br /> <br />يجب ان تكون مسجل دخول بالموقع <br /></p>
                                <div className="w-full mt-8">
                                    <Link href="/login" className="before:ease relative overflow-hidden btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all flex items-center justify-center w-full before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-100">
                                        <span className="relative z-10">تسجيل دخول</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    );
}



