"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import { fetchOneToken } from '@/app/api/dataFetch';
import SkeletonCheckoutCourse from '@/components/ui/SkeletonCheckoutCourse';
import { Course  } from '@/app/api/interfaces';
type CheckoutFormProps = {
    token: string;
};

export default function CheckoutCourse({ token }: CheckoutFormProps) {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchcourse = async () => {
        if (!id || !token) return;
        setLoading(true);
        try {
            const data = await fetchOneToken('checkout/courses', id, token);
            setCourse(data);
        } catch (error) {
            console.error("Error fetching course data:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchcourse();
}, []);

    if (loading) {
        return <SkeletonCheckoutCourse />;
    }

    if (!course) {
        return <div>Course data not available</div>;
    }

    return (
        <div className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-start">
            <div className='relative w-full'>
                <img src={course.image} alt={course.name} className='h-[288px] w-full rounded-t-2xl' />
            </div>
            <div className="px-8 py-5 space-y-2 w-full">
                <h4 className="text-start font-bold text-2xl">{course.name}</h4>
                <div className="flex justify-between items-center w-full">
                    <span className="font-bold text-[#FE7A36] text-2xl">{course.price}$</span>
                    <div className="text-primary bg-[#eeeeee] py-1 px-2 rounded-lg text-xs">
                        {course.duration} دقيقة
                    </div>
                </div>
                {/* <div className="flex justify-between items-center w-full">
                    <p>المجموع الفرعي</p>
                    <b className="text-[#FE7A36]">{course.price}$</b>
                </div>
                <div className="flex justify-between items-center w-full">
                    <p>خصم (10%)</p>
                    <b className="text-[#FE7A36]">0$</b>
                </div> */}
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700 w-full" />
                <div className="flex justify-between items-center w-full">
                    <p> المبلغ الكلي</p>
                    <b className="text-[#FE7A36] font-bold text-2xl">{course.price}$</b>
                </div>
            </div>
        </div>
    );
}
