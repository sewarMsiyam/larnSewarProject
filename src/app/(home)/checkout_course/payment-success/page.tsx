
import Breadcrumb from "@/components/ui/breadcrumbHome"
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/authOptions";
import CheckoutForm from "@/components/pages/checkout/formSuccess";
import Course from "@/components/pages/checkout/course_checkout";
import Link from 'next/link';
import { redirect } from "next/navigation";


export default async function CheckoutCourse() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/student/login?callbackUrl=/checkout_course");
    }
    const authToken = session.user.authToken;
    if (typeof authToken !== 'string' || !authToken) {
        console.error("Auth token is missing or invalid");
        return <div>An error occurred. Please try logging in again.</div>;
    }


    const breadcrumbs = [
        { label: 'الرئيسية', href: '/' },
        { label: 'تفاصيل الدفع', href: '/checkout_course/?id=', isActive: true }
    ]

    return (
        <>
            {session ? (
                <>
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                    <div className="container my-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <CheckoutForm token={authToken} />
                            <Course token={authToken} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center h-[80vh]">
                        <div className="container p-4 bg-white rounded-lg shadow-md">
                            <div className="container py-10">
                                <p className="text-2xl text-center font-bold mb-4">للاشتراك بالكورس  <br /> <br />يجب ان تكون مسجل دخول بالموقع <br /></p> 
                                <div className="w-full mt-8">
                                <Link href="/student/login" className="before:ease relative overflow-hidden btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all flex items-center justify-center w-full before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-100">
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



