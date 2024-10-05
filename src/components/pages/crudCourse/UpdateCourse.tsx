"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateCourseFun, fetchOneTokenUpdateCourse } from "@/app/api/dataFetch";

interface DetailsInstructorsProps {
    id: number;
}

interface CourseFeature {
    id: number;
    feature: string;
}

interface CourseDuration {
    day: string;
    from_time: string;
    to_time: string;
}

interface FormData {
    name: string;
    description: string;
    duration: number;
    price: number;
    category: string;
    course_features: CourseFeature[];
    image: File | null;
    zoom_link: string | null;
    course_durations: CourseDuration[];
}


export default function UpdateCourse({ id }: DetailsInstructorsProps) {
    const t = useTranslations("HomePage");
    const { data: session } = useSession();
    const token = (session?.user as { authToken?: string | null })?.authToken;
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name_ar: "",
        description_ar: "",
        course_result_desc_ar: "",
        duration: "",
        introduction_video: "",
        price: "",
        category: "",
        feature_ar: [] as { id: number; feature: string }[],
        image: null as File | null,
        zoom_link: "",
        course_days: [{ day: "", from_time: "", to_time: "" }],
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                console.log('id = ' + id + 'token = ' + token)
                setLoading(true);
                const result = await fetchOneTokenUpdateCourse(`instructor/courses`, id , token as string);
                if (result.status) {
                    console.log(result.item)
                    setFormData(prevFormData => ({
                        ...prevFormData,
                         name_ar: result.item.name,
                         description_ar: result.item.description,
                         course_result_desc_ar: result.item.description,
                         duration: result.item.duration,
                        //  introduction_video: result.item.introduction_video,
                         price: result.item.price,
                         category: result.item.category,
                         feature_ar: result.item.course_features,
                         zoom_link: result.item.zoom_link,
                         course_days: result.item.course_durations,

                        ...result.item,
                    }));
                    if (result.item.image) {
                        setSelectedImage(result.item.image);
                    }
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
    }, [id , token]);

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handlers
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            setFormData(prev => ({
                ...prev,
                // feature_ar: [...(prev.feature_ar || []), inputValue.trim()]
                 feature_ar: [
                ...(prev.feature_ar || []),
                {
                    id: prev.feature_ar.length + 1,
                    feature: inputValue.trim(),
                },
            ],
            }));
            setInputValue('');
        }
    };

    const removeTag = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            feature_ar: (prev.feature_ar || []).filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file,
        }));
    };

    const handleCourseDayChange = (index: number, field: string, value: string) => {
        const updatedDays = [...formData.course_days];
        updatedDays[index] = { ...updatedDays[index], [field]: value };
        setFormData(prev => ({ ...prev, course_days: updatedDays }));
    };

    const addCourseDay = () => {
        setFormData(prev => ({
            ...prev,
            course_days: [...prev.course_days, { day: "", from_time: "", to_time: "" }]
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const courseData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && key !== 'course_days' && key !== 'feature_ar') {
                courseData.append(key, value.toString());
            }
        });

        // formData.feature_ar.forEach((feature, index) => {
        //     courseData.append(`feature_ar[${index}]`, feature);
        // });
        formData.feature_ar.forEach((feature, index) => {
            courseData.append(`feature_ar[${index}][id]`, feature.id.toString());
            courseData.append(`feature_ar[${index}][feature]`, feature.feature);
        });

        formData.course_days.forEach((day, index) => {
            courseData.append(`course_days[${index + 1}][day]`, day.day);
            courseData.append(`course_days[${index + 1}][from_time]`, day.from_time);
            courseData.append(`course_days[${index + 1}][to_time]`, day.to_time);
        });

        if (formData.image instanceof File) {
            courseData.append('image', formData.image);
        }

        try {
            const result = await CreateCourseFun(`instructor/courses/update/${id}`, token as string, courseData);
            if (result.status) {
                toast.success(result.message || "تم تحديث الكورس بنجاح");
                router.push('/instructor/profile');
                setStep(1);
            } else {
                toast.error(result.message || "فشل في تحديث الكورس.");
            }
        } catch (error: any) {
            console.error("Error updating course:", error);
            toast.error(error.message || "فشل في تحديث الكورس.");
        } finally {
            setIsLoading(false);
        }
    };


if (loading) {
    return (
    <>
             <div className="container bg-white rounded-3xl py-8 lg:p-16 my-10 shadow-md">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-lg">تعديل كورس</h3>
                    {step > 1 && (
                        <div
                            onClick={prevStep}
                            className="text-xs text-[#FF6F61] flex items-center space-x-5 cursor-pointer"
                        >
                            <svg width="5" height="9" className="mx-1" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.40039 11.4015L6.40039 6.38725L1.40039 1.37305" stroke="#FF6F61" strokeWidth="2.13068" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            رجوع
                        </div>
                    )}
                </div>

                <form>
                    {step === 1 && (
                        <>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">اسم الكورس (العنوان)</Label>
                                <Skeleton className="w-full h-[40px] mt-2 rounded-full" />
                            </div>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="mb-4">
                                    <Label className="block text-sm font-medium text-gray-700">سعر الكورس</Label>
                                    <Skeleton className="w-full h-[40px] mt-2 rounded-full" />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm font-medium text-gray-700">مدة الحصة</Label>
                                    <Skeleton className="w-full h-[40px] mt-2 rounded-full" />
                                </div>
                            </div>
                              <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">محتوى الكورس</Label>
                                <Skeleton className="w-full h-[80px] mt-2 rounded-xl" />                             
                            </div>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">مميزات الكورس </Label>
                                <Skeleton className="w-full h-[40px] mt-2 rounded-full" />
                            </div>
                        </>
                    )}
                </form>
            </div>

</>
    );
  }


    // Render
    return (
        <>
            <ToastContainer />
            <div className="container bg-white rounded-3xl py-8 lg:p-16 my-10 shadow-md">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-lg">نعديل كورس</h3>
                    {step > 1 && (
                        <div
                            onClick={prevStep}
                            className="text-xs text-[#FF6F61] flex items-center space-x-5 cursor-pointer"
                        >
                            <svg width="5" height="9" className="mx-1" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.40039 11.4015L6.40039 6.38725L1.40039 1.37305" stroke="#FF6F61" strokeWidth="2.13068" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            رجوع
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">اسم الكورس (العنوان)</Label>
                                <Input
                                    type="text"
                                    id="name_ar"
                                    value={formData.name_ar}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="اسم الكورس"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="mb-4">
                                    <Label className="block text-sm font-medium text-gray-700">سعر الكورس</Label>
                                    <Input
                                        type="text"
                                        id="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="10 $ "
                                        className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm font-medium text-gray-700">مدة الحصة</Label>
                                    <Input
                                        type="text"
                                        id="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="60 دقيقة "
                                        className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">محتوى الكورس</Label>
                                <Textarea
                                    id="description_ar"
                                    value={formData.description_ar}
                                    onChange={handleChange}
                                    rows={4}
                                    className="border-none rounded-xl mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </div>

                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">مميزات الكورس</Label>
                                <div className="flex flex-row flex-nowrap items-center px-4 border-none rounded-full mt-2 w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                    {formData.feature_ar.length > 0 ? (
                                        formData.feature_ar.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="bg-white text-sm flex items-center whitespace-nowrap p-1 mr-2 rounded-full"
                                            >
                                                {feature.feature}
                                                <button
                                                    type="button"
                                                    className="ps-2 pe-1 align-middle"
                                                    onClick={() => removeTag(index)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))
                                    ) : null}
                                    <Input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="border-none rounded-full block flex-grow bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="أضف ميزة واضغط Enter"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">نتائج الكورس</Label>
                                <Textarea
                                    id="course_result_desc_ar"
                                    value={formData.course_result_desc_ar}
                                    onChange={handleChange}
                                    rows={4}
                                    className="border-none rounded-xl mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </div>

                            <div className="mb-6">
                                <Label className="block text-sm font-medium text-gray-700">أيام وأوقات الكورس </Label>
                                <span className="text-xs text-gray-500">(يفضل اختيار 3 أيام بألاسبوع بنفس التوقيت)</span>
                                
                                {Array.isArray(formData.course_days) && formData.course_days.map((day, index) => (
                                    <div key={index} className="flex gap-2 mt-2">
                                        <Input
                                            type="day"
                                            value={day.day}
                                            onChange={(e) => handleCourseDayChange(index, 'day', e.target.value)}
                                            className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder="اليوم "
                                        />
                                        <Input
                                            type="time"
                                            value={day.from_time}
                                            onChange={(e) => handleCourseDayChange(index, 'from_time', e.target.value)}
                                            className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder="وقت بداية الكورس "
                                        />
                                        <Input
                                            type="time"
                                            value={day.to_time}
                                            onChange={(e) => handleCourseDayChange(index, 'to_time', e.target.value)}
                                            className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder="وقت نهاية الكورس "
                                        />
                                    </div>
                                ))}
                                <div onClick={addCourseDay} className="mt-5">
                                    <span className="btn-outLine-primary font-medium py-2.5 px-6 md:px-3 lg:px-6 me-2 relative overflow-hidden border border-primary text-primary">إضافة يوم</span>
                                   
                                </div>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                        
                            <div className="mb-5">
                                <Label htmlFor="category"> حدد الكورس لأي فئة </Label>
                                 <Select dir="rtl" onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                                    <SelectTrigger className="border-none text-start rounded-full mt-2 w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                        <SelectValue placeholder="اختر تصنيف" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tawjihi">توجيهي</SelectItem>
                                        <SelectItem value="university">جامعة</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>


                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700"> صورة الغلاف</Label>
                                  <Input
                                    type="file"
                                    id="image"
                                    onChange={handleFileChange}
                                    className="hidden" 
                                    ref={fileInputRef} 
                                />
                                <div className="bg-gray-100 flex flex-col mt-2 justify-center items-center rounded-xl p-8" onClick={handleImageClick} >
                                    <img src="/camera.svg" alt="" width="20" />
                                    <h2 >أرفع الصورة هنا</h2>
                                    {selectedImage && (
                                    <img src={selectedImage} alt="Selected" className="mt-4" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                    )}
                                </div>
                            </div>
                             <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">رابط الفيديو التعريفي للكورس</Label>
                                <Input
                                    id="introduction_video"
                                    value={formData.introduction_video}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                             <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">رابط الزوم </Label>
                                <Input
                                    id="zoom_link"
                                    value={formData.zoom_link}
                                    onChange={handleChange}
                                   className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>                            
                        </>
                   )}

                    <div className="flex flex-col lg:flex-row items-center justify-between mt-6">
                        <div></div>
                        <div>
                            <h5 className="font-bold text-center mb-5">
                                خطوة {step} من 3
                            </h5>
                            <div className="relative w-[238px] h-[13px] bg-[#EEEEEE] rounded-full px-1">
                                <span
                                    className={`absolute h-[7px] bg-[#0ABC8C] rounded-full top-[3px] transition-all ease-in-out delay-150 ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-[97%]"
                                        }`}
                                ></span>
                            </div>
                        </div>
                        <div className="">
                            {step < 3 ? (
                                <div
                                    onClick={nextStep}
                                    className="before:ease relative overflow-hidden btn-primary font-medium py-2.5 px-6 md:px-7 lg:px-14 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                                >
                                    التالي
                                </div>
                            ) : (
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="before:ease relative overflow-hidden btn-primary text-white rounded-2xl font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                                >
                                    {isLoading ? "جاري التحديث..." : "تحديث الكورس"}
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}



