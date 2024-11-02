"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Lessons } from '@/app/api/interfaces';
import { CreateCourseFun, fetchOneTokenUpdateCourse } from '@/app/api/dataFetch';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import DropZone from '@/components/ui/DropZone';
import { X, Upload, File } from 'lucide-react';

interface LessonsProps {
    id: string;
    lessonId: string;
    token: string;
}

interface FormData {
    name_ar: string;
    course_id: string;
    recorded_video_link: string;
    zoom_link: string;
    course_name: string;
    summary_file: File | null;
}

interface FormErrors {
    name_ar: string;
    link: string;
    zoom_link: string;
}

export default function UpdateLessons({ token, id, lessonId }: LessonsProps) {
    const t = useTranslations('HomePage');
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSummaryFile, setCurrentSummaryFile] = useState<string | null>(null);
    const [isReplacingFile, setIsReplacingFile] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        name_ar: "",
        course_id: "",
        recorded_video_link: "",
        zoom_link: "",
        course_name: "",
        summary_file: null,
    });

    const [errors, setErrors] = useState<FormErrors>({
        name_ar: "",
        link: "",
        zoom_link: ""
    });

    // دالة للتحقق من صحة رابط Zoom
    const isValidZoomLink = (link: string): boolean => {
        if (!link) return true; // السماح بحقل فارغ
        const zoomPattern = /^https?:\/\/[^.]+\.?zoom\.us\/(j|my|w|rec)\/[\w\-]+(\?pwd=[\w-]+\.?\d*)?$/i;
        return zoomPattern.test(link);
    };

    const fetchCourseData = async () => {
        try {
            setLoading(true);
            const result = await fetchOneTokenUpdateCourse(`instructor/lessons`, lessonId, token);
            if (result.status) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    name_ar: result.item.name,
                    course_name: result.item.course_name,
                    course_id: result.item.course_id,
                    recorded_video_link: result.item.recorded_video_link,
                    zoom_link: result.item.zoom_link,
                    summary_file: null,
                }));
                setCurrentSummaryFile(result.item.summary_file);
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

    useEffect(() => {
        if (id && token) {
            fetchCourseData();
        }
    }, [id, token]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        
        // إعادة تعيين الأخطاء
        setErrors(prev => ({ ...prev, [id]: "", link: "", zoom_link: "" }));

        // التحقق من رابط Zoom إذا تم إدخاله
        if (id === 'zoom_link' && value) {
            if (!isValidZoomLink(value)) {
                setErrors(prev => ({
                    ...prev,
                    zoom_link: "الرجاء إدخال رابط زووم صالح"
                }));
            }
        }
    };
    
    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        return `https://cdn.jsdelivr.net/gh/dmhendricks/file-icon-vectors/dist/icons/vivid/${extension}.svg`;
    };

    const renderFilePreview = (fileName: string) => {
        return (
            <div className="relative">
                <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded">
                    <img 
                        src={getFileIcon(fileName)}
                        alt={fileName}
                        className="w-16 h-16"
                    />
                </div>
            </div>
        );
    };

    const handleFileUpload = (file: File | null) => {
        setFormData(prev => ({ ...prev, summary_file: file }));
        setIsReplacingFile(true);
    };

    const removeFile = () => {
        setCurrentSummaryFile(null);
        setFormData(prev => ({ ...prev, summary_file: null }));
        setIsReplacingFile(true);
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors: FormErrors = { name_ar: "", link: "", zoom_link: "" };

        if (!formData.name_ar.trim()) {
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
            const result = await CreateCourseFun(`instructor/lessons/update/${lessonId}`, token, formDataToSend);
            if (result.status) {
                toast.success(result.message || "تم تعديل الدرس بنجاح");
                router.push(`/course/${id}/lessons`);
            } else {
                toast.error(result.message || "فشل في تعديل الدرس.");
            }
        } catch (error: any) {
            console.error("Error updating lesson:", error);
            toast.error(error.message || "فشل في تعديل الدرس.");
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
                            className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">ملخص الدرس</Label>
                        <div className="mt-3">
                            {!isReplacingFile && currentSummaryFile ? (
                                <div className="border-2 border-dashed rounded-lg p-4 transition-colors duration-300 bg-[#f3f4f6] hover:border-gray-400">
                                    <div className="flex items-center justify-between">
                                        {renderFilePreview(currentSummaryFile)}
                                        <div className="ml-4 flex-grow">
                                            <p className="text-sm text-gray-600">{currentSummaryFile.split('/').pop()}</p>
                                        </div>
                                        <div className="mt-2 ">
                                                <a
                                                    href={currentSummaryFile}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline mr-4"
                                                >
                                                    عرض الملف
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsReplacingFile(true)}
                                                    className="text-blue-600 hover:underline mr-4"
                                                >
                                                    استبدال
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="text-red-600  hover:underline mr-4"
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            ) : (
                                <DropZone
                                    onFileUpload={handleFileUpload}
                                />
                            )}
                        </div>
                    </div>
                    <div className="text-end">
                        <Button type="submit" disabled={isLoading} className="before:ease relative overflow-hidden btn-primary text-white rounded-2xl font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40">
                            {isLoading ? "جاري التعديل..." : "تعديل الدرس "}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}