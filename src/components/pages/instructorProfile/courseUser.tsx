"use client";
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Course } from '@/app/api/interfaces';
import { fetchAllCoursepaginationToken, deleteOneToken } from '@/app/api/dataFetch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react";

type CheckoutFormProps = {
    token: string;
};

interface Pagination {
    current_page: number;
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    last_page_url: string;
    to: number;
    total: number;
    last_page: number;
}

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
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('course');
    const [isDeleting, setIsDeleting] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    const getDayInArabic = (day: string): string => {
        const daysMap: { [key: string]: string } = {
            'saturday': 'السبت',
            'sunday': 'الأحد',
            'monday': 'الاثنين',
            'tuesday': 'الثلاثاء',
            'wednesday': 'الأربعاء',
            'thursday': 'الخميس',
            'friday': 'الجمعة'
        };

        const normalizedDay = day.toLowerCase();
        return daysMap[normalizedDay] || day;
    };

    const loadCourses = async (isLoadMore: boolean = false) => {
        if (!token) return;

        try {
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            const pageUrl = isLoadMore && pagination?.next_page_url
                ? pagination.next_page_url.split('v1/')[1]
                : 'instructor/instructor_courses';

            const response = await fetchAllCoursepaginationToken(pageUrl, token);

            if (response) {
                const newCourses = response.courses;
                if (isLoadMore) {
                    setCourses(prev => [...prev, ...newCourses]);
                } else {
                    setCourses(newCourses);
                }
                setPagination(response.pagination);
            }
        } catch (err) {
            setError('حدث خطأ أثناء تحميل البيانات');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
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

    const handleDeleteClick = (course: Course) => {
        setCourseToDelete(course);
        setIsOpen(true);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const deleteCourse = async (courseId: number) => {
        setIsDeleting(true);
        try {
            await deleteOneToken('instructor/courses', courseId, token);
            toast.success('تم حذف الكورس بنجاح');
            setCourses(prevCourses => prevCourses.filter(course => course.id !== Number(courseId)));
            setCourseToDelete(null);
        } catch (error) {
            console.error('خطأ أثناء حذف الكورس:', error);
            toast.error('حدث خطأ أثناء محاولة حذف الكورس');
        } finally {
            setIsDeleting(false);
            setIsOpen(false);
            setCourseToDelete(null);
        }
    };

    const renderLoadMoreButton = () => {
        if (!pagination?.next_page_url) return null;

        return (
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => loadCourses(true)}
                    disabled={loadingMore}
                    className="btn-primary font-medium py-2.5 px-6 before:ease relative overflow-hidden transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-60"
                >
                    {loadingMore ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            جاري التحميل...
                        </div>
                    ) : (
                        "تحميل المزيد"
                    )}
                </button>
            </div>
        );
    };

    if (loading) return (
        <>
            <div className="flex justify-between items-center mb-5">
                <div className="flex gap-2">
                    <h4 className='font-bold text-lg'> كورساتي </h4>
                    <p className='text-gray-300'>عدد الكورسات  <span className='text-gray-950'>{courses.length}</span></p>
                </div>
                <div>
                    <Link href="/course/create_course-new" className="flex items-center gap-2 before:ease relative overflow-hidden btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                        <Image src="/profileIcon/IconAdd.svg" alt='خصوصي' width="30" height="30" />
                        <span>اضافة كورس</span>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <p className="text-lg font-medium text-gray-600">جاري تحميل الكورسات...</p>
            </div>
        </>
    );

    if (error) return <p>{error}</p>;

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <div className="flex flex-col lg:flex-row gap-2">
                    <h4 className='font-bold text-lg'> كورساتي </h4>
                    <p className='text-gray-300'>عدد الكورسات  <span className='text-gray-950'>{courses.length}</span></p>
                </div>
                <div>
                    <Link href="/course/create_course-new" className="flex items-center gap-2 before:ease relative overflow-hidden btn-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                        <Image src="/profileIcon/IconAdd.svg" alt='خصوصي' width="30" height="30" />
                        <span>اضافة كورس</span>
                    </Link>
                </div>
            </div>

           {courses.map((course , index) => (
                    <>
                        <div key={index} className="flex items-center flex-col lg:flex-row border rounded-lg p-3 mb-4">
                            <img src={course.image} alt="" className="w-full h-56 lg:w-72 lg:h-60 rounded-lg" />
                            <div className="p-5 w-full">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <h3 className='font-bold text-lg'>{course.name}</h3>
                                        <div className="text-primary bg-[#eeeeee] py-1 px-2 rounded-lg text-xs ms-5">
                                            {course.duration} دقيقة
                                        </div>
                                    </div>
                                    <h3 className='font-bold text-lg text-[#FE7A36]'>{course.price} $</h3>
                                </div>
                               

                                {course.course_appointments && course.course_appointments.length > 0 && (
                                    <>
                                        <h2 className="font-bold mb-3 mt-5">وقت الكورس</h2>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                            {course.course_appointments.map((duration, i) => (
                                                <div key={i} className="col-span-1">
                                                    <div className="flex items-center justify-evenly gap-3 bg-[#F2F2F3] font-bold text-sm p-3 rounded-xl px-5">
                                                        <span>{getDayInArabic(duration.day)}</span>
                                                        <div className="w-px h-[29px] bg-[rgba(0,_0,_0,_0.20)]"></div>
                                                        <span className="text-primary">
                                                            {formatTimeTo12Hour(duration.from_time)} - {formatTimeTo12Hour(duration.to_time)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <div className="flex flex-col lg:flex-row justify-between items-center gap-3 mt-4">
                                    <p className="flex-none">رابط الزوم</p>
                                    {course.zoom_link ? (
                                        <>
                                            <div className='lg:grow overflow-hidden	 border px-5 py-2 rounded-3xl border-[#0000001A]'>
                                                <Link href={course.zoom_link} className="text-[#226AC8] line-clamp-1 text-ellipsis overflow-hidden">{course.zoom_link}</Link>
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
                                        </>
                                    ) : (
                                        <div className='lg:grow overflow-hidden	 border px-5 py-2 rounded-3xl border-[#0000001A]'>
                                            <p className="text-[#226AC8] line-clamp-1 text-ellipsis overflow-hidden">رابط غير متاح بعد</p>
                                        </div>
                                    )}
                                </div>
                                <Link href={`/course/${course.id}/lessons`} className="flex justify-center gap-2 w-full text-center">
                                                قائمةالدروس
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.15693 3.41217L12.9651 8.22059L6.37061 14.8237C6.06413 15.13 5.67053 15.334 5.24366 15.4081L1.28696 16.0676C1.23999 16.0745 1.19252 16.0773 1.14506 16.0759C0.9223 16.0734 0.709419 15.9835 0.552372 15.8254C0.457339 15.7305 0.385934 15.6145 0.343888 15.4869C0.301842 15.3593 0.290349 15.2238 0.310313 15.0909L0.969747 11.134C1.04394 10.7072 1.248 10.3135 1.55408 10.007L8.15693 3.41217ZM15.1605 1.21656C14.8457 0.899138 14.4712 0.647244 14.0586 0.475309C13.646 0.303375 13.2034 0.214844 12.7564 0.214844C12.3094 0.214844 11.8668 0.303375 11.4542 0.475309C11.0416 0.647244 10.6671 0.899138 10.3523 1.21656L9.34231 2.22662L14.1505 7.03504L15.1605 6.02498C15.4779 5.7102 15.7298 5.33563 15.9018 4.92299C16.0737 4.51035 16.1622 4.0679 16.1622 3.62087C16.1622 3.17384 16.0737 2.73118 15.9018 2.31854C15.7298 1.9059 15.4779 1.53133 15.1605 1.21656Z" fill="currentColor" fillOpacity="0.4" />
                                                </svg>
                                            </Link>
                                            <Link href={`/course/update_course/${course.id}`} className="flex justify-center gap-2 w-full text-center">
                                                تعديل الكورس
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.15693 3.41217L12.9651 8.22059L6.37061 14.8237C6.06413 15.13 5.67053 15.334 5.24366 15.4081L1.28696 16.0676C1.23999 16.0745 1.19252 16.0773 1.14506 16.0759C0.9223 16.0734 0.709419 15.9835 0.552372 15.8254C0.457339 15.7305 0.385934 15.6145 0.343888 15.4869C0.301842 15.3593 0.290349 15.2238 0.310313 15.0909L0.969747 11.134C1.04394 10.7072 1.248 10.3135 1.55408 10.007L8.15693 3.41217ZM15.1605 1.21656C14.8457 0.899138 14.4712 0.647244 14.0586 0.475309C13.646 0.303375 13.2034 0.214844 12.7564 0.214844C12.3094 0.214844 11.8668 0.303375 11.4542 0.475309C11.0416 0.647244 10.6671 0.899138 10.3523 1.21656L9.34231 2.22662L14.1505 7.03504L15.1605 6.02498C15.4779 5.7102 15.7298 5.33563 15.9018 4.92299C16.0737 4.51035 16.1622 4.0679 16.1622 3.62087C16.1622 3.17384 16.0737 2.73118 15.9018 2.31854C15.7298 1.9059 15.4779 1.53133 15.1605 1.21656Z" fill="currentColor" fillOpacity="0.4" />
                                                </svg>
                                            </Link>
                            </div>



                            <div className="relative">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M25.1482 13.6628C25.1482 20.0869 19.9266 25.3086 13.5024 25.3086C7.07823 25.3086 1.85657 20.0869 1.85657 13.6628C1.85657 7.23859 7.07823 2.01693 13.5024 2.01693C19.9266 2.01693 25.1482 7.23859 25.1482 13.6628ZM3.48157 13.6628C3.48157 19.1878 7.9774 23.6836 13.5024 23.6836C19.0274 23.6836 23.5232 19.1878 23.5232 13.6628C23.5232 8.13776 19.0274 3.64193 13.5024 3.64193C7.9774 3.64193 3.48157 8.13776 3.48157 13.6628Z" fill="black" fillOpacity="0.4" />
                                            <path d="M14.5857 13.6628C14.5857 14.2694 14.0982 14.7461 13.5024 14.7461C12.9066 14.7461 12.4191 14.2586 12.4191 13.6628C12.4191 13.0669 12.9066 12.5794 13.5024 12.5794C14.0982 12.5794 14.5857 13.0561 14.5857 13.6628Z" fill="black" fillOpacity="0.4" />
                                            <path d="M14.5857 9.32975C14.5857 9.93642 14.0982 10.4131 13.5024 10.4131C12.9066 10.4131 12.4191 9.92559 12.4191 9.32975C12.4191 8.73392 12.9066 8.24642 13.5024 8.24642C14.0982 8.24642 14.5857 8.72309 14.5857 9.32975Z" fill="black" fillOpacity="0.4" />
                                            <path d="M14.5857 17.9967C14.5857 18.6034 14.0982 19.0801 13.5024 19.0801C12.9066 19.0801 12.4191 18.5926 12.4191 17.9967C12.4191 17.4009 12.9066 16.9134 13.5024 16.9134C14.0982 16.9134 14.5857 17.3901 14.5857 17.9967Z" fill="black" fillOpacity="0.4" />
                                        </svg>

                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Link href={`/course/${course.id}/lessons`} className="flex justify-center gap-2 w-full text-center">
                                                قائمةالدروس
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.15693 3.41217L12.9651 8.22059L6.37061 14.8237C6.06413 15.13 5.67053 15.334 5.24366 15.4081L1.28696 16.0676C1.23999 16.0745 1.19252 16.0773 1.14506 16.0759C0.9223 16.0734 0.709419 15.9835 0.552372 15.8254C0.457339 15.7305 0.385934 15.6145 0.343888 15.4869C0.301842 15.3593 0.290349 15.2238 0.310313 15.0909L0.969747 11.134C1.04394 10.7072 1.248 10.3135 1.55408 10.007L8.15693 3.41217ZM15.1605 1.21656C14.8457 0.899138 14.4712 0.647244 14.0586 0.475309C13.646 0.303375 13.2034 0.214844 12.7564 0.214844C12.3094 0.214844 11.8668 0.303375 11.4542 0.475309C11.0416 0.647244 10.6671 0.899138 10.3523 1.21656L9.34231 2.22662L14.1505 7.03504L15.1605 6.02498C15.4779 5.7102 15.7298 5.33563 15.9018 4.92299C16.0737 4.51035 16.1622 4.0679 16.1622 3.62087C16.1622 3.17384 16.0737 2.73118 15.9018 2.31854C15.7298 1.9059 15.4779 1.53133 15.1605 1.21656Z" fill="currentColor" fillOpacity="0.4" />
                                                </svg>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href={`/course/update_course/${course.id}`} className="flex justify-center gap-2 w-full text-center">
                                                تعديل
                                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.15693 3.41217L12.9651 8.22059L6.37061 14.8237C6.06413 15.13 5.67053 15.334 5.24366 15.4081L1.28696 16.0676C1.23999 16.0745 1.19252 16.0773 1.14506 16.0759C0.9223 16.0734 0.709419 15.9835 0.552372 15.8254C0.457339 15.7305 0.385934 15.6145 0.343888 15.4869C0.301842 15.3593 0.290349 15.2238 0.310313 15.0909L0.969747 11.134C1.04394 10.7072 1.248 10.3135 1.55408 10.007L8.15693 3.41217ZM15.1605 1.21656C14.8457 0.899138 14.4712 0.647244 14.0586 0.475309C13.646 0.303375 13.2034 0.214844 12.7564 0.214844C12.3094 0.214844 11.8668 0.303375 11.4542 0.475309C11.0416 0.647244 10.6671 0.899138 10.3523 1.21656L9.34231 2.22662L14.1505 7.03504L15.1605 6.02498C15.4779 5.7102 15.7298 5.33563 15.9018 4.92299C16.0737 4.51035 16.1622 4.0679 16.1622 3.62087C16.1622 3.17384 16.0737 2.73118 15.9018 2.31854C15.7298 1.9059 15.4779 1.53133 15.1605 1.21656Z" fill="currentColor" fillOpacity="0.4" />
                                                </svg>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <button onClick={() => handleDeleteClick(course)} className="flex justify-center gap-2 w-full text-center">
                                                حذف
                                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.1622 4.26929C19.1622 4.50289 19.0656 4.72686 18.8939 4.89204C18.7221 5.05722 18.4891 5.15009 18.2461 5.15009H1.75758C1.51464 5.15009 1.28165 5.05722 1.10987 4.89204C0.938076 4.72686 0.841553 4.50289 0.841553 4.26929C0.841553 4.03569 0.938076 3.81172 1.10987 3.64654C1.28165 3.48136 1.51464 3.38849 1.75758 3.38849H5.01776C5.21009 3.38854 5.39751 3.3304 5.55354 3.22227C5.70957 3.11413 5.82627 2.96141 5.88704 2.78595L6.17649 1.95096C6.29814 1.59975 6.5318 1.29441 6.84423 1.07812C7.15665 0.861821 7.53199 0.745636 7.91697 0.746095H12.0932C12.478 0.745575 12.8533 0.861558 13.1657 1.07769C13.4781 1.29381 13.7118 1.59906 13.8336 1.9501L14.1231 2.78681C14.184 2.96211 14.3008 3.11473 14.4568 3.2227C14.6128 3.33066 14.8002 3.3886 14.9924 3.38849H18.2461C18.4891 3.38849 18.7221 3.48136 18.8939 3.64654C19.0656 3.81172 19.1622 4.03569 19.1622 4.26929ZM16.6889 6.93814L16.1301 15.0414C16.0719 15.8218 15.7092 16.5521 15.1147 17.0862C14.5201 17.6203 13.7376 17.9188 12.924 17.9217H7.07972C6.26748 17.9192 5.48615 17.622 4.89179 17.0897C4.29743 16.5574 3.93382 15.8291 3.87361 15.0503L3.31485 6.93814C3.31145 6.87895 3.32019 6.81966 3.34062 6.76374C3.36105 6.70782 3.39279 6.65627 3.43393 6.61214C3.47792 6.56825 3.53051 6.53332 3.58869 6.50913C3.64687 6.48494 3.70948 6.47205 3.77286 6.47129H16.2309C16.2942 6.4721 16.3568 6.48494 16.415 6.50913C16.4731 6.53332 16.5258 6.56829 16.5698 6.61214C16.611 6.65624 16.6427 6.70781 16.6632 6.76374C16.6836 6.81967 16.6923 6.87895 16.6889 6.93814ZM9.08583 9.55408C9.08583 9.32048 8.9893 9.09651 8.81751 8.93133C8.64573 8.76615 8.41274 8.67328 8.1698 8.67328C7.92685 8.67328 7.69387 8.76615 7.52208 8.93133C7.35029 9.09651 7.25377 9.32048 7.25377 9.55408V13.9581C7.25377 14.1917 7.35029 14.4156 7.52208 14.5808C7.69387 14.746 7.92685 14.8389 8.1698 14.8389C8.41274 14.8389 8.64573 14.746 8.81751 14.5808C8.9893 14.4156 9.08583 14.1917 9.08583 13.9581V9.55408ZM12.7499 9.55408C12.7499 9.32048 12.6534 9.09651 12.4816 8.93133C12.3098 8.76615 12.0769 8.67328 11.8339 8.67328C11.591 8.67328 11.358 8.76615 11.1862 8.93133C11.0144 9.09651 10.9179 9.32048 10.9179 9.55408V13.9581C10.9179 14.1917 11.0144 14.4156 11.1862 14.5808C11.358 14.746 11.591 14.8389 11.8339 14.8389C12.0769 14.8389 12.3098 14.746 12.4816 14.5808C12.6534 14.4156 12.7499 14.1917 12.7499 13.9581V9.55408Z" fill="currentColor" fillOpacity="0.4" />
                                                </svg>
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </>
                ))}

            {/* Load More Button */}
            {renderLoadMoreButton()}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader className='flex flex-col items-center'>
                        <Image src="/login.png" alt="" width={150} height={150} className="text-center" />
                        <p className="text-lg text-dark text-center font-bold my-5">
                            هل أنت متأكد من حذف الكورس ({courseToDelete?.name}) ؟
                        </p>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-full flex gap-2">
                        <AlertDialogAction
                            onClick={() => courseToDelete && deleteCourse(courseToDelete.id)}
                            disabled={isDeleting}
                            className="before:ease relative overflow-hidden w-full btn-primary text-white font-medium py-2.5 px-6 md:px-3 lg:px-6 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                        >
                            {isDeleting ? 'جاري الحذف...' : 'تأكيد الحذف'}
                        </AlertDialogAction>
                        <AlertDialogCancel onClick={handleCancel} className="w-full">إلغاء</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <ToastContainer />
        </>
    );
}