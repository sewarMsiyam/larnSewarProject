"use client";
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { Lessons } from '@/app/api/interfaces';
import { CreateCourseFun } from '@/app/api/dataFetch';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import DropZone from '@/components/ui/DropZone';

interface LessonsProps {
    id: string;
    token: string;
}

interface FormData {
    name_ar: string;
    course_id: string;
    recorded_video_link: string;
    zoom_link: string;
    summary_file: File | null;
}

interface FormErrors {
    name_ar: string;
    link: string;
}

export default function CreateLessons({ id, token }: LessonsProps) {
    const t = useTranslations('HomePage');
    const router = useRouter();

    const [lessons, setLessons] = useState<Lessons[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState<FormData>({
        name_ar: "",
        course_id: id,
        recorded_video_link: "",
        zoom_link: "",
        summary_file: null,
    });

    const [errors, setErrors] = useState<FormErrors>({
        name_ar: "",
        link: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: "", link: "" }));
    };

    const handleFileUpload = (file: File | null) => {
        setFormData(prev => ({ ...prev, summary_file: file }));
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = { name_ar: "", link: "" };

        if (!formData.name_ar) {
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append("name_ar", formData.name_ar);
        formDataToSend.append("course_id", formData.course_id);
        formDataToSend.append("recorded_video_link", formData.recorded_video_link);
        formDataToSend.append("zoom_link", formData.zoom_link);
        if (formData.summary_file) {
            formDataToSend.append("summary_file", formData.summary_file);
        }

        try {
            const result = await CreateCourseFun("instructor/lessons", token, formDataToSend);
            if (result.status) {
                toast.success(result.message || "تم إنشاء الكورس بنجاح");
                router.push(`/course/${id}/lessons`);
                setFormData({
                    name_ar: "",
                    course_id: id,
                    recorded_video_link: "",
                    zoom_link: "",
                    summary_file: null,
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
            <div className="container bg-white rounded-3xl py-8 lg:p-16 my-10 shadow-md">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-lg">إضافة درس</h3>
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
                            className={`border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.link ? 'border-red-500' : ''}`}
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
                            className={`border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.link ? 'border-red-500' : ''}`}
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">ارفق ملخص</Label>
                        <div className="relative mt-2">
                            <DropZone
                                onFileUpload={handleFileUpload}
                                acceptedFileTypes={['image/*', 'application/pdf']}
                            />
                        </div>
                    </div>
                    <div className="text-end">
                        <Button type="submit" disabled={isLoading} className="before:ease relative overflow-hidden btn-primary text-white rounded-2xl font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                            {isLoading ? "جاري الإنشاء..." : "نشر الدرس للكورس"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}