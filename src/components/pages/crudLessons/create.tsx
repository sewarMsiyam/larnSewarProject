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
import DropZone from '@/components/ui/MultiDropZone';

interface LessonsProps {
    id: string;
    token: string;
}

interface FormData {
    name_ar: string;
    course_id: string;
    recorded_video_link: string;
    zoom_link: string;
    summary_files: File[];
}

interface FormErrors {
    name_ar: string;
    link: string;
    zoom_link: string;
}

interface DropZoneProps {
    onFilesUpload: (files: File[]) => void;
    maxFiles?: number;
    maxSize?: number;
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
        summary_files: [],
    });

    const [errors, setErrors] = useState<FormErrors>({
        name_ar: "",
        link: "",
        zoom_link: ""
    });

    const isValidZoomLink = (link: string): boolean => {
        if (!link) return true; 
        const zoomPattern = /^https?:\/\/[^.]+\.?zoom\.us\/(j|my|w|rec)\/[\w\-]+(\?pwd=[\w-]+\.?\d*)?$/i;
        return zoomPattern.test(link);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: "", link: "" }));

        if (id === 'zoom_link' && value) {
            if (!isValidZoomLink(value)) {
                setErrors(prev => ({
                    ...prev,
                    zoom_link: "الرجاء إدخال رابط زووم صالح"
                }));
            }
        }
    };

    const handleFilesUpload = (files: File[]) => {
        setFormData(prev => ({ ...prev, summary_files: files }));
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = { name_ar: "", link: "", zoom_link: "" };

        if (!formData.name_ar) {
            newErrors.name_ar = "اسم الدرس مطلوب";
            isValid = false;
        }

        if (!formData.zoom_link && !formData.recorded_video_link) {
            newErrors.link = "يجب إدخال رابط الزوم أو رابط الفيديو المسجل";
            isValid = false;
        }

        if (formData.zoom_link && !isValidZoomLink(formData.zoom_link)) {
            newErrors.zoom_link = "الرجاء إدخال رابط زووم صالح";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // const validateFileTypes = (files: File[]): boolean => {
    //     setIsLoading(false);
    //     const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'application/pdf'];
        
    //     for (const file of files) {
    //         if (!allowedTypes.includes(file.type)) {
    //             toast.error('يجب أن تكون الملفات من نوع: jpeg, png, jpg, gif, pdf');
    //             return false;
    //         }
    //     }
    //     return true;
    // };

    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        
        const formDataToSend = new FormData();
        formDataToSend.append("name_ar", formData.name_ar);
        formDataToSend.append("course_id", formData.course_id);
        formDataToSend.append("recorded_video_link", formData.recorded_video_link);
        formDataToSend.append("zoom_link", formData.zoom_link);
        
        formData.summary_files.forEach((file, index) => {
            formDataToSend.append(`summary_files[${index}]`, file);
        });


        try {
            const result = await CreateCourseFun("instructor/lessons", token, formDataToSend);
            toast.success(result.message || "تم إنشاء الدرس بنجاح");
            router.push(`/course/${id}/lessons`);
            setFormData({
                name_ar: "",
                course_id: id,
                recorded_video_link: "",
                zoom_link: "",
                summary_files: [],
            });
        } catch (error: any) {
            toast.error(error.message || "فشل في إنشاء الدرس.");
            console.error("Error creating lesson:", error);
            setIsLoading(false);
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
                        <Label className="block text-sm font-medium text-gray-700">اسم الدرس <span className="text-red-500">*</span></Label>
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
                        <Label className="block text-sm font-medium text-gray-700">رابط الزوم <span className="text-red-500">*</span></Label>
                        <Input
                            type="text"
                            id="zoom_link"
                            value={formData.zoom_link}
                            onChange={handleChange}
                            className={`border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.zoom_link ? 'border-red-500' : ''}`}
                            placeholder="https://zoom.us/j/example"
                        />
                        {errors.zoom_link && <p className="text-red-500 text-xs mt-1">{errors.zoom_link}</p>}
                    </div>

                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">رابط الفيديو المسجل <span className="text-red-500">*</span></Label>
                        <Input
                            type="text"
                            id="recorded_video_link"
                            value={formData.recorded_video_link}
                            onChange={handleChange}
                            className={`border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors.link ? 'border-red-500' : ''}`}
                        />
                        {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link}</p>}
                    </div>

                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">ارفق ملخص (يمكنك رفع عدة ملفات)</Label>
                        <div className="relative mt-2">
                            <DropZone
                                onFilesUpload={handleFilesUpload}
                                maxFiles={5}
                                maxSize={5 * 1024 * 1024}
                            />
                        </div>
                    </div>

                    <div className="text-end">
                        <Button 
                            type="submit" 
                            disabled={isLoading} 
                            className="before:ease relative overflow-hidden btn-primary text-white rounded-2xl font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                        >
                            {isLoading ? "جاري الإنشاء..." : "نشر الدرس للكورس"}
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}