"use client";
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabsProfile"
import Image from "next/image";
import { Course } from '@/app/api/interfaces';
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
export default function UserCourse({ token }: CheckoutFormProps) {
    const t = useTranslations('HomePage');

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState<string | null>(null);


    useEffect(() => {
        const loadCourses = async () => {
            if (token) {
                try {
                    const fetchedCourses = await fetchAllToken('student/student_courses', token);
                    if (Array.isArray(fetchedCourses)) {
                        setCourses(fetchedCourses);
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

        loadCourses();
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


    if (loading) return <p>جاري التحميل...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <TabsContent value="course" className="bg-white rounded-lg p-10 shadow-md">
                <div className="flex justify-between items-center mb-5">
                    <h4 className='font-bold text-lg'> الكورسات </h4>
                    <p className='text-gray-300'>عدد الكورسات  <span className='text-gray-950'>{courses.length}</span></p>
                </div>

                {courses.map((course, index) => (
                    <div key={index} className="flex flex-col lg:flex-row border rounded-lg p-5 mb-4">
                        <img src={course.image} alt="" className="w-full h-56 lg:w-1/4 lg:h-auto rounded-lg" />
                        <div className="p-5 w-full">
                            <div className="flex justify-between items-center">
                                <h3 className='font-bold text-lg'>{course.name}</h3>
                                <h3 className='font-bold text-lg text-[#FE7A36]'>{course.price} $</h3>
                            </div>

                            {course.course_appointments && course.course_appointments.length > 0 && (
                                <>
                                    <h2 className="font-bold mb-3 mt-5">وقت الكورس </h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                        {course.course_appointments.map((duration) => (
                                            <div key={duration.id} className="col-span-1">
                                                <div className="flex justify-evenly gap-4 bg-[#F2F2F3] font-bold p-3 rounded-xl px-8">
                                                    <span>{duration.date}</span>
                                                    <div className="w-px h-[29px] bg-[rgba(0,_0,_0,_0.20)]"></div>
                                                    <span className="text-primary">{duration.from_time} - {duration.to_time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}


                            {/* <div className="p-4 px-10 bg-[#F9F9F9] shadow-sm rounded-xl flex justify-around items-center font-bold w-fit">
                                <div>
                                    <p>التاريخ:</p>
                                    <p>الوقت:</p>
                                </div>
                                <div>
                                    <p className="text-primary">{course.date}</p>
                                    <p className="text-primary">{course.time}</p>
                                </div>
                            </div> */}

                            <div className="flex flex-col lg:flex-row justify-between items-center gap-3 mt-4">
                                <p className="flex-none">رابط الزوم</p>
                                <div className='lg:grow overflow-hidden	 border px-5 py-2 rounded-3xl border-[#0000001A]'>
                                    {/* <Link href={course.zoom_link} target='_blank' className="text-[#226AC8] line-clamp-1 text-ellipsis overflow-hidden">{course.zoom_link}</Link> */}
                                    {course.zoom_link ? (
                                        <Link 
                                            href={course.zoom_link} 
                                            target='_blank' 
                                            className="text-[#226AC8] line-clamp-1 text-ellipsis overflow-hidden"
                                        >
                                            {course.zoom_link}
                                        </Link>
                                        ) : (
                                        <span className="text-gray-400">No Zoom link available</span>
                                        )}
                                </div>
                                <div className="flex-none">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Image src="/profileIcon/copy.svg" alt="zoom" width='30' height='30' onClick={() => copyToClipboard(course.zoom_link)} />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>اضغط لنسخ الرابط</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </TabsContent>
            <ToastContainer />

            {/* <TabsContent value="course" className="bg-white rounded-lg p-5 shadow-md">
                <div className="flex justify-between items-center">
                    <h4 className='font-bold text-lg'> الكورسات </h4>
                    <p className='text-gray-300'>عدد الكورسات  <span className='text-gray-950'>03</span></p>
                </div>
                <div className="flex flex-col lg:flex-row border rounded-lg p-3">
                    <img src="/course2.png" alt="" className="w-56 h-44 rounded-lg" />
                    <div className="px-5 w-full">
                        <div className="flex justify-between items-center  ">
                            <h3 className='font-bold text-lg'>كورس تعليمي لغة إنجليزية </h3>
                            <h3 className='font-bold text-lg text-[#FE7A36]'> 20$</h3>
                        </div>
                         <div className="p-4 px-10 bg-[#F9F9F9] shadow-sm rounded-xl flex justify-around items-center font-bold w-fit">
                            <div>
                                <p>التاريخ:</p>
                                <p>الوقت:</p>
                            </div>
                            <div>
                                <p className="text-primary">11 سبتمبر 2024</p>
                                <p className="text-primary">2:00 م - 4:00 م , 2:00 م - 4:00 م</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>رابط الزوم</p>
                            <a href="#" className="text-[#226AC8] border px-5 py-2 rounded-3xl border-[#0000001A]">zoommtg://zoom.us/join?confno=8529015944&pwd 8529015944&pwd</a>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.2881 10.4972V14.2472C14.2881 17.3722 13.0381 18.6222 9.91309 18.6222H6.16309C3.03809 18.6222 1.78809 17.3722 1.78809 14.2472V10.4972C1.78809 7.37222 3.03809 6.12222 6.16309 6.12222H9.91309C13.0381 6.12222 14.2881 7.37222 14.2881 10.4972Z" stroke="#226AC8" strokeWidth="2" strokeLinecap="round" />
                                <path d="M18.4548 5.16387V7.91387C18.4548 10.2055 17.5381 11.1222 15.2464 11.1222H14.2881V10.4972C14.2881 7.3722 13.0381 6.1222 9.91309 6.1222H9.28809V5.16387C9.28809 2.8722 10.2048 1.95554 12.4964 1.95554H15.2464C17.5381 1.95554 18.4548 2.8722 18.4548 5.16387Z" stroke="#226AC8" strokeWidth="2" strokeLinecap="round" />
                            </svg>

                        </div>

                    </div>
                </div>
            </TabsContent> */}

        </>
    );
}
