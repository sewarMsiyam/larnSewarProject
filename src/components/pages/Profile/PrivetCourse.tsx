"use client";
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabsProfile"
import Image from "next/image";
import { fetchAllToken } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
type CheckoutFormProps = {
    token: string;
};

interface Instructor {
    name: string;
    image: string;
    hourly_rate_price: string;

}
interface Instructors {
    instructor: Instructor;
    private_lesson_appointments: Array<{
        id: number;
        date: string;
        from_time: string;
        to_time: string;
        zoom_link: string;
    }>;
}
const formatTimeTo12Hour = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours, 10);
    const ampm = hoursNum >= 12 ? 'م' : 'ص';
    const hour12 = hoursNum % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};

export default function PrivetInstructors({ token }: CheckoutFormProps) {
    const t = useTranslations('HomePage');

    const [instructors, setInstructors] = useState<Instructors[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<string | null>(null);


    useEffect(() => {
        const loadInstructors = async () => {
            if (token) {
                try {
                    const fetchedInstructors = await fetchAllToken('student/private_lessons', token);
                    console.log(fetchedInstructors)
                    if (Array.isArray(fetchedInstructors)) {
                        setInstructors(fetchedInstructors);
                    } else {
                        setError('البيانات المستلمة غير صحيحة');
                    }
                } catch (err) {
                    setError('حدث خطأ أثناء تحميل البيانات');
                } finally {
                    setLoading(false);
                }
            }
        };

        loadInstructors();
    }, [token]);

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('تم نسخ الرابط بنجاح!', {
                autoClose: 700,
            });
        } catch (err) {
            toast.error('فشل النسخ!');
        }
    };


    if (loading) return <div className="flex justify-center items-center h-screen">
        جاري التحميل ..
    </div>;
    if (error) return <p>{error}</p>;

    return (
            <TabsContent value="privetCourse" className="bg-white rounded-lg p-10 shadow-md">
                <div className="flex justify-between items-center mb-5">
                    <h4 className='font-bold text-lg'> معلم خصوصي </h4>
                    <p className='text-gray-300'>عدد حجز الخصوصي  <span className='text-gray-950'>{instructors.length}</span></p>
                </div>

                {instructors.map((x, index) => (
                    <div key={index} className="flex flex-col lg:flex-row items-start border rounded-lg p-5 mb-4">
                        <img src={`https://sewaar.net${x.instructor.image}`} alt="" className="size-40 rounded-full" />
                        <div className="p-5 w-full">
                            <div className="flex justify-between items-center">
                                <h3 className='font-bold text-lg'>{x.instructor.name}</h3>
                                <h3 className='font-bold text-lg text-[#FE7A36]'>{x.instructor.hourly_rate_price}$</h3>
                            </div>

                            {x.private_lesson_appointments.length > 0 && (
                                <>
                                    <h2 className="font-bold mb-3 mt-5">وقت الدرس الخصوصي </h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                        {x.private_lesson_appointments.map((duration) => (
                                            <div key={duration.id} className="col-span-1">


                                                <div className="flex justify-between items-center gap-3 border border-[#D9D9D9] font-bold p-3 rounded-xl px-6">
                                                    <div className='flex flex-col gap-3'>
                                                        <span className="flex items-center gap-2">
                                                            <img src='/profileIcon/calender.svg' alt='' className='' />
                                                            {duration.date}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <img src='/profileIcon/time.svg' alt='' className='' />
                                                            {/* من: {formatTimeTo12Hour(duration.from_time)} - إلى: {formatTimeTo12Hour(duration.to_time)} */}
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <img src='/profileIcon/zoom.svg' alt='' className='' />


                                                            {duration.zoom_link ? (
                                                                <a href={duration.zoom_link} target="_blank" className="text-[#226AC8] line-clamp-1 text-ellipsis overflow-hidden">
                                                                    {duration.zoom_link}
                                                                </a>
                                                            ) : (
                                                                <p>لا يوجد رابط زوم بعد</p>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>



                                </>
                            )}
                        </div>
                    </div>
                ))}

                <ToastContainer />
            </TabsContent>
    );
}
