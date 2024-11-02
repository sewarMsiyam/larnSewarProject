"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation';
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
    token: string;
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
    name_ar: string;
    description_ar: string;
    course_result_desc_ar: string;
    duration: string;
    introduction_video: string;
    price: string;
    category: string;
    feature_ar: CourseFeature[]; 
    image: File | string | null;
    zoom_link: string;
    course_start: string;
    course_days: CourseDuration[];
}

export default function UpdateCourse({ id , token  }: DetailsInstructorsProps) {
    const t = useTranslations("HomePage");
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const [formData, setFormData] = useState<FormData>({
        name_ar: "",
        description_ar: "",
        course_result_desc_ar: "",
        duration: "",
        introduction_video: "",
        price: "",
        category: "",
        feature_ar: [],
        image: null as File | null,
        zoom_link: "",
        course_start: "",
        course_days: [{ day: "", from_time: "", to_time: "" }],
    });

    useEffect(() => {

        const fetchCourseData = async () => {
            try {
                setLoading(true);
                const result = await fetchOneTokenUpdateCourse(`instructor/courses`, id.toString() , token as string);

                if (result.status) {
                    const currentImage = result.item.image || null;

                    const formattedFeatures = Array.isArray(result.item.course_features)
                        ? result.item.course_features.map((feature: CourseFeature) => ({
                            feature: feature.feature
                        }))
                        : [];
                                   
                        console.log(formattedFeatures)
                    setFormData(prevFormData => ({
                        ...prevFormData,
                         name_ar: result.item.name,
                         description_ar: result.item.description,
                         course_result_desc_ar: result.item.description,
                         duration: result.item.duration,
                         introduction_video: result.item.introduction_video,
                         price: result.item.price,
                         category: result.item.category === 'tawjihi' ? 'التوجيهي' : 'الجامعة',
                        feature_ar: formattedFeatures,
                         zoom_link: result.item.zoom_link,
                         course_days: result.item.course_appointments,
                          image: currentImage,
                        ...result.item,
                    }));
                    if (currentImage) {
                        setSelectedImage(currentImage);
                    }

                } else {
                    toast.error("فشل في جلب بيانات الكورس");
                }
            } catch (error) {
                console.error("Error fetching course data:", error);
                toast.error("حدث خطأ أثناء جلب بيانات الكورس");
            } finally {
                setLoading(false);
            }
        };

        if (id && token) {
            fetchCourseData();
        }
    }, [token]);

  // Refs
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    // Handlers
      const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };
    const prevStep = () => setStep(step - 1);

    

    interface DayOption {
    value: string;
    label: string;
    arabicLabel: string;
}

const dayOptions: DayOption[] = [
    { value: 'saturday', label: 'Saturday', arabicLabel: 'السبت' },
    { value: 'sunday', label: 'Sunday', arabicLabel: 'الأحد' },
    { value: 'monday', label: 'Monday', arabicLabel: 'الاثنين' },
    { value: 'tuesday', label: 'Tuesday', arabicLabel: 'الثلاثاء' },
    { value: 'wednesday', label: 'Wednesday', arabicLabel: 'الأربعاء' },
    { value: 'thursday', label: 'Thursday', arabicLabel: 'الخميس' },
    { value: 'friday', label: 'Friday', arabicLabel: 'الجمعة' }
];



     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            const newFeature: CourseFeature = {
                id: Date.now(), // Use a temporary id
                feature: inputValue.trim()
            };
            setFormData(prev => ({
                ...prev,
                feature_ar: [...(prev.feature_ar || []), newFeature]
            }));
            setInputValue('');
            setErrors(prev => ({ ...prev, feature_ar: '' }));
        }
    };

    const removeTag = (idToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            feature_ar: prev.feature_ar.filter(feature => feature.id !== idToRemove)
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));

        if (id === 'zoom_link' && value) {
            if (!isValidZoomLink(value)) {
                setErrors(prev => ({
                    ...prev,
                    zoom_link: "الرجاء إدخال رابط زووم صالح"
                }));
            }
        }

    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
        setSelectedImage(URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            image: file
        }));
        setErrors(prev => ({ ...prev, image: '' }));
    }
    };

    const handleCourseDayChange = (index: number, field: string, value: string) => {
        const updatedDays = [...formData.course_days];
        updatedDays[index] = { ...updatedDays[index], [field]: value };
        setFormData(prev => ({ ...prev, course_days: updatedDays }));
        setErrors(prev => ({ ...prev, [`course_days_${index}`]: '' }));
    };

    const addCourseDay = () => {
        setFormData(prev => ({
            ...prev,
            course_days: [...prev.course_days, { day: "", from_time: "", to_time: "" }]
        }));
    };

    const isValidZoomLink = (link: string): boolean => {
        if (!link) return true; 
        const zoomPattern = /^https?:\/\/[^.]+\.?zoom\.us\/(j|my|w|rec)\/[\w\-]+(\?pwd=[\w-]+\.?\d*)?$/i;
    
        return zoomPattern.test(link);
    };


     const validateStep = (currentStep: number) => {
        const newErrors: {[key: string]: string} = {};

        switch (currentStep) {
            case 1:
                if (!formData.name_ar) newErrors.name_ar = "الرجاء إدخال اسم الكورس";
                if (!formData.price) newErrors.price = "الرجاء إدخال سعر الكورس";
                if (!formData.duration) newErrors.duration = "الرجاء إدخال مدة الحصة";
                if (!formData.description_ar) newErrors.description_ar = "الرجاء إدخال محتوى الكورس";
                if (formData.feature_ar.length === 0) newErrors.feature_ar = "الرجاء إدخال ميزة واحدة على الأقل للكورس";
                break;
            case 2:
                if (!formData.course_result_desc_ar) newErrors.course_result_desc_ar = "الرجاء إدخال نتائج الكورس";
                formData.course_days.forEach((day, index) => {
                    if (!day.day) {
                        newErrors[`course_days_${index}_day`] = "الرجاء اختيار اليوم الدرس";
                    }
                    if (!day.from_time) {
                        newErrors[`course_days_${index}_from_time`] = "الرجاء إدخال وقت البداية الحصة";
                    }
                    if (!day.to_time) {
                        newErrors[`course_days_${index}_to_time`] = "الرجاء إدخال وقت النهاية نهاية الحصة";
                    }
                });
                break;
            case 3:
                if (!formData.category) {
                    newErrors.category = "الرجاء اختيار فئة المستهدفة للكورس";
                }
               if (!formData.image && !selectedImage) {
                    newErrors.image = "الرجاء تحميل صورة للكورس";
                }
                if (!formData.introduction_video) {
                    newErrors.introduction_video = "الرجاء ادخال رابط الفيديو التشويقي";
                }
            break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const validateEndStep = () => {
        const newErrors: {[key: string]: string} = {};

        if (!formData.category) {
            newErrors.category = "الرجاء اختيار فئة المستهدفة في الكورس";
        }
        if (!formData.image && !selectedImage) {
            newErrors.image = "الرجاء تحميل صورة الكورس";
        }
        if (!formData.introduction_video) {
            newErrors.introduction_video = "الرجاء ادخال رابط الفيديو التشويقي";
        }
        if (formData.zoom_link && !isValidZoomLink(formData.zoom_link)) {
            newErrors.zoom_link = "الرجاء إدخال رابط زووم صالح";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEndStep()) return; 
        setIsLoading(true);
        const courseData = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && key !== 'course_days' && key !== 'feature_ar'&& key !== 'category'&& key !== 'image') {
                courseData.append(key, value.toString());
            }
        });

        courseData.append('category', formData.category === 'التوجيهي' ? 'tawjihi' : 'university');


        formData.feature_ar.forEach((feature, index) => {
            courseData.append(`feature_ar[${index}]`, feature.feature);
        });

        formData.course_days.forEach((day, index) => {
            courseData.append(`course_days[${index + 1}][day]`, day.day);
            courseData.append(`course_days[${index + 1}][from_time]`, day.from_time);
            courseData.append(`course_days[${index + 1}][to_time]`, day.to_time);
        });

       if (formData.image instanceof File) {
        courseData.append('image', formData.image);
        } else if (typeof formData.image === 'string') {
           courseData.append("image",  [] as unknown as Blob);
        }

        try {
            const result = await CreateCourseFun(`instructor/courses/update/${id}`, token as string, courseData);
                toast.success("تم تحديث الكورس بنجاح");
                router.push('/instructor/profile');
                setStep(1);
        } catch (error: any) {
            console.error("Error creating course:", error);
            toast.error(error.message || "فشل في إنشاء الكورس.");
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
                    <h3 className="font-bold text-lg">تعديل كورس</h3>
                    {step > 1 && (
                        <div
                            onClick={prevStep}
                            className="text-[#FF6F61] flex items-center space-x-5 cursor-pointer"
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
                                <Label className="block text-sm font-medium text-gray-700">اسم الكورس (العنوان) <span className="text-red-500">*</span></Label>
                                <Input
                                    type="text"
                                    id="name_ar"
                                    value={formData.name_ar}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="اسم الكورس"
                                    required
                                />
                                {errors.name_ar && <p className="text-red-500 text-xs mt-1">{errors.name_ar}</p>}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="mb-4">
                                    <Label className="block text-sm font-medium text-gray-700">سعر الكورس  <span className="text-red-500">*</span></Label>
                                    <Input
                                        type="text"
                                        id="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="10 $ "
                                        className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        required
                                         />
                                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label className="block text-sm font-medium text-gray-700">مدة الحصة  <span className="text-red-500">*</span></Label>
                                    <Input
                                        type="text"
                                        id="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="60 دقيقة "
                                        className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" required />
                                        {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration} (ولو مدة تقريبية)</p>}
                                </div>
                            </div>

                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">محتوى الكورس  <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="description_ar"
                                    value={formData.description_ar}
                                    onChange={handleChange}
                                    rows={4}
                                    className="border-none rounded-xl mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" required />
                                    {errors.description_ar && <p className="text-red-500 text-xs mt-1">{errors.description_ar}</p>}
                            </div>

                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">مميزات الكورس  <span className="text-red-500">*</span></Label>
                                <div className="flex flex-row flex-nowrap items-center px-4 border-none rounded-full mt-2 w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                    {formData.feature_ar.length > 0 && formData.feature_ar.map((feature,index) => (
                                        <div
                                            key={index}
                                            className="bg-white text-sm flex items-center whitespace-nowrap p-1 m-1 rounded-full"
                                        >
                                            {feature.feature}
                                            <button
                                                type="button"
                                                className="ps-2 pe-1 align-middle"
                                                onClick={() => removeTag(feature.id)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <Input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="border-none rounded-full block flex-grow bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="أضف ميزة واضغط Enter"
                                    />
                                </div>
                                {errors.feature_ar && <p className="text-red-500 text-xs mt-1">{errors.feature_ar}</p>}
                            </div>
                        </>
                    )}
                     {step === 2 && (
                        <>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">نتائج الكورس  <span className="text-red-500">*</span></Label>
                                <Textarea
                                    id="course_result_desc_ar"
                                    value={formData.course_result_desc_ar}
                                    onChange={handleChange}
                                    rows={4}
                                    className="border-none rounded-xl mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    {errors.course_result_desc_ar && <p className="text-red-500 text-xs mt-1">{errors.course_result_desc_ar}</p>}
                            </div>

                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">تاريخ بداية الكورس</Label>
                                <Input
                                    type="date"
                                    id="course_start"
                                    value={formData.course_start}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="اسم الكورس"
                                    required
                                />
                                {errors.course_start && <p className="text-red-500 text-xs mt-1">{errors.course_start}</p>}
                            </div>

                            <div className="mb-6">
                                <Label className="block text-sm font-medium text-gray-700">أيام وأوقات الكورس  <span className="text-red-500">*</span></Label>
                                <span className="text-xs text-gray-500">(يفضل اختيار 3 أيام بألاسبوع بنفس التوقيت)</span>

                                {formData.course_days.map((day, index) => (
                                    <div key={index} className="flex flex-wrap gap-2 mt-2">
                                          <div className="flex-1 min-w-[150px]">
                                            <Select
                                                value={day.day}
                                                onValueChange={(value) => handleCourseDayChange(index, 'day', value)}
                                                name={`course_days_${index}_day`}
                                                dir="rtl"
                                            >
                                                <SelectTrigger  className="border-none rounded-full bg-gray-100 mt-2"
                                                >
                                                    <SelectValue placeholder="اختر اليوم" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {dayOptions.map((option,index) => (
                                                        <SelectItem key={index} value={option.value}>
                                                            {option.arabicLabel}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors[`course_days_${index}_day`] && (
                                                <p className="text-red-500 text-xs mt-1">{errors[`course_days_${index}_day`]}</p>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-[150px]">
                                            <Input
                                                type="time"
                                                value={day.from_time}
                                                onChange={(e) => handleCourseDayChange(index, 'from_time', e.target.value)}
                                                className={`border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors[`course_days_${index}_from_time`] ? 'border-red-500' : ''}`}
                                                placeholder="وقت بداية الكورس"
                                            />
                                            {errors[`course_days_${index}_from_time`] && <p className="text-red-500 text-xs mt-1">{errors[`course_days_${index}_from_time`]}</p>}
                                        </div>
                                        <div className="flex-1 min-w-[150px]">
                                            <Input
                                                type="time"
                                                value={day.to_time}
                                                onChange={(e) => handleCourseDayChange(index, 'to_time', e.target.value)}
                                                className={`border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${errors[`course_days_${index}_to_time`] ? 'border-red-500' : ''}`}
                                                placeholder="وقت نهاية الكورس"
                                            />
                                            {errors[`course_days_${index}_to_time`] && <p className="text-red-500 text-xs mt-1">{errors[`course_days_${index}_to_time`]}</p>}
                                        </div>
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
                                <Label htmlFor="category"> حدد الكورس لأي فئة  <span className="text-red-500">*</span></Label>
                                <Select dir="rtl" value={formData.category} onValueChange={(value) => {
                                        setFormData(prev => ({ ...prev, category: value }));
                                        setErrors(prev => ({ ...prev, category: '' }));
                                    }}>
                                    <SelectTrigger className="border-none text-start rounded-full mt-2 w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                        <SelectValue placeholder="اختر تصنيف" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="التوجيهي">توجيهي</SelectItem>
                                        <SelectItem value="الجامعة">جامعة</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>


                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700"> صورة الغلاف  <span className="text-red-500">*</span></Label>
                                  <Input
                                    type="file"
                                    id="image"
                                    onChange={handleFileChange}
                                    className="hidden" 
                                    ref={fileInputRef} 
                                    accept="image/*"
                                />
                                <div  className="bg-gray-100 flex flex-col mt-2 justify-center items-center rounded-xl p-8 cursor-pointer"  onClick={handleImageClick}>
                                    {(selectedImage || formData.image) ? (
                                        <img 
                                            src={selectedImage || (typeof formData.image === 'string' ? formData.image : '')} 
                                            alt="Course Cover" 
                                            className="mt-4 object-contain" 
                                            style={{ maxWidth: '100%', maxHeight: '300px' }} 
                                        />
                                    ) : (
                                        <>
                                            <img src="/camera.svg" alt="" width="20" />
                                            <h2>أرفع الصورة هنا</h2>
                                        </>
                                    )}
                                </div>
                                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                            </div>
                             <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">رابط الفيديو التعريفي للكورس  <span className="text-red-500">*</span></Label>
                                <Input
                                    id="introduction_video"
                                    value={formData.introduction_video}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                {errors.introduction_video && <p className="text-red-500 text-xs mt-1">{errors.introduction_video}</p>}
                            </div>
                             <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">رابط الزوم </Label>
                                <Input
                                    id="zoom_link"
                                    value={formData.zoom_link}
                                    onChange={handleChange}
                                   className="border-none rounded-full mt-2 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                 {errors.zoom_link && <p className="text-red-500 text-xs mt-1">{errors.zoom_link}</p>}
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



