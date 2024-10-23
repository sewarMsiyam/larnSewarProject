"use client";
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TabsContent } from "@/components/ui/tabsProfile"
import Image from "next/image";
import { Course } from '@/app/api/interfaces';
import { fetchAllToken } from '@/app/api/dataFetch';
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
const formatTimeTo12Hour = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hoursNum = parseInt(hours, 10);
    const ampm = hoursNum >= 12 ? 'م' : 'ص';
    const hour12 = hoursNum % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
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
                                                <div className="flex justify-evenly items-center gap-3 bg-[#F2F2F3] text-sm font-bold p-3 rounded-xl px-4">
                                                    <span>{duration.day}</span>
                                                    <div className="w-px h-[29px] bg-[rgba(0,_0,_0,_0.20)]"></div>
                                                    <span className="text-primary"> {formatTimeTo12Hour(duration.from_time)}  -  {formatTimeTo12Hour(duration.to_time)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}


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

                            <Link href={`/profile/courses/${course.id}/lessons`} className="text-blue-600 hover:underline">
                                قائمة الدروس
                            </Link>
                        </div>
                    </div>
                ))}
            </TabsContent>
            <ToastContainer />



        </>
    );
}
