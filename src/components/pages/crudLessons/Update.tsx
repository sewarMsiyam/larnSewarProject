"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Lessons } from '@/app/api/interfaces';
import { CreateCourseFun, fetchOneTokenUpdateCourse } from '@/app/api/dataFetch';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';


interface LessonsProps {
    id: string; 
    lessonId: string; 
    token: string;

}
export default function UpdateLessons({ token, id, lessonId }: LessonsProps) {
    const t = useTranslations('HomePage');
    const [lessons, setLessons] = useState<Lessons[]>([]);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name_ar: "",
        course_id: "",
        recorded_video_link: "",
        zoom_link: "",
        course_name: "",
    });
     const [errors, setErrors] = useState({
        name_ar: "",
        link: "",
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true)
                const result = await fetchOneTokenUpdateCourse(`instructor/lessons`, lessonId, token as string);
                if (result.status) {
                    console.log(result.item)
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        name_ar: result.item.name,
                        course_name: result.item.course_name,
                        course_id: result.item.course_id,
                        recorded_video_link: result.item.recorded_video_link,
                        ...result.item,
                    }));
                } else {
                    toast.error("Failed to fetch course data");
                }
            } catch (error) {
                console.error("Error fetching course data:", error);
                toast.error("An error occurred while fetching course data");
            } finally {
                setLoading(false);
            }
        };

        if (id && token) {
            fetchCourseData();
        }
    }, [id, token]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: "", link: "" }));

    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = { name_ar: "", link: "" };

        if (!formData.name_ar.trim()) {
            newErrors.name_ar = "اسم الدرس مطلوب";
            isValid = false;
        }

        if (!formData.zoom_link && !formData.recorded_video_link) {
            newErrors.link = "يجب إدخال رابط الزوم أو رابط الفيديو المسجل";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        const courseData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                courseData.append(key, value.toString());
            }
        });
        console.log(courseData);

        try {

            const result = await CreateCourseFun("instructor/lessons", token as string, courseData);
            if (result.status) {
                toast.success(result.message || "تم إنشاء الكورس بنجاح");
                router.push(`/course/${id}/lessons`);
                setFormData({
                    name_ar: "",
                    course_id: id,
                    recorded_video_link: "",
                    zoom_link: "",
                    course_name: "",
                });
            } else {
                toast.error(result.message || "فشل في إنشاء الكورس.");
            }
        } catch (error: any) {
            console.error("Error creating course:", error);
            toast.error(error.message || "فشل في إنشاء الكورس.");
        } finally {
            setIsLoading(false);
        }
    };


    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            loading ..
        </div>
    );

    return (
        <> 
            {/* id = {id}
            lessonId = {lessonId} */}
           <div className="container bg-white rounded-3xl py-8 lg:p-16 my-10 shadow-md">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-lg">تعديل الدرس للكورس <span className="text-primary text-xl">({formData.course_name})</span></h3>
                    <Link href={`/course/${id}/lessons`} className="text-xs text-[#FF6F61] flex items-center space-x-5 cursor-pointer">
                        <svg width="5" height="9" className="mx-1" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.40039 11.4015L6.40039 6.38725L1.40039 1.37305" stroke="#FF6F61" strokeWidth="2.13068" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        رجوع
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        id="course_id"
                        value={formData.course_id}
                        onChange={handleChange}
                        className="hidden"
                    />

                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">اسم الدرس </Label>
                        <Input
                            type="text"
                            id="name_ar"
                            value={formData.name_ar}
                            onChange={handleChange}
                            className={`border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.name_ar ? 'border-red-500' : ''}`}
                            placeholder="اسم الدرس"
                            required
                        />
                        {errors.name_ar && <p className="text-red-500 text-xs mt-1">{errors.name_ar}</p>}
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">رابط الزوم</Label>
                        <Input
                            type="text"
                            id="zoom_link"
                            value={formData.zoom_link}
                            onChange={handleChange}
                            className={`border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.name_ar ? 'border-red-500' : ''}`}
                        />
                        {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link}</p>}
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">رابط الفيديو المسجل</Label>
                        <Input
                            type="text"
                            id="recorded_video_link"
                            value={formData.recorded_video_link}
                            onChange={handleChange}
                            className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                     <div className="text-end">
                        <Button type="submit" disabled={isLoading} className="before:ease relative overflow-hidden btn-primary text-white rounded-2xl font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                            {isLoading ? "جاري الإنشاء..." : "تعديل الدرس "}
                        </Button>
                    </div>
                </form> 
            </div>
        </>
    );
}
