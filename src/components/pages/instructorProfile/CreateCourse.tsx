"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { TabsContent } from "@/components/ui/tabsProfile";
import { Button } from "@/components/ui/button";
import { CreateCourseFun } from "@/app/api/dataFetch";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"


export default function CreateCourse() {
    const t = useTranslations("HomePage");
    const { data: session } = useSession();
    const token = (session?.user as { authToken?: string | null })?.authToken;
    const [step, setStep] = useState(1);
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [features, setFeatures] = useState<string[]>([]);
    const [featureInput, setFeatureInput] = useState('');



    // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Enter' && inputValue.trim() !== '') {
    //         e.preventDefault();
    //         if (!tags.includes(inputValue)) {
    //             setTags([...tags, inputValue]);
    //             setInputValue('');
    //         }
    //     }
    // };

    // const removeTag = (indexToRemove: number) => {
    //     setTags(tags.filter((_, index) => index !== indexToRemove));
    // };
    // Form state
    const [formData, setFormData] = useState({
        name_ar: "",
        description_ar: "",
        course_result_desc_ar: "",
        duration: "",
        introduction_video: "",
        price: "",
        category_id: 0,
        feature_ar: [],
        image: null as File | null,
        zoom_link: "0",
        course_days: [{ day: "", from_time: "", to_time: "" }],
        lessons_count: ""
    });
    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file,
        }));
    };

    
    const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && featureInput.trim() !== '') {
            e.preventDefault();
            setFeatures(prev => [...prev, featureInput.trim()]);
            setFeatureInput('');
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(prev => prev.filter((_, i) => i !== index));
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

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
           const courseData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && key !== 'course_days') {
                courseData.append(key, value.toString());
            }
        });

        features.forEach((feature, index) => {
            courseData.append(`feature_ar[${index}]`, feature);
        });

        formData.course_days.forEach((day, index) => {
            courseData.append(`course_days[${index + 1}][day]`, day.day);
            courseData.append(`course_days[${index + 1}][from_time]`, day.from_time);
            courseData.append(`course_days[${index + 1}][to_time]`, day.to_time);
        });


        try {
            const result = await CreateCourseFun("instructor/courses", token as string, courseData);

            if (result.status) {
                toast.success("تم إنشاء الكورس بنجاح");
                setFormData({
                    name_ar: "",
                    description_ar: "",
                    course_result_desc_ar: "",
                    duration: "",
                    introduction_video: "",
                    price: "",
                     image: null,
                    category_id: 0,
                    course_days: [{ day: "", from_time: "", to_time: "" }],
                    feature_ar: [],
                   
                });
                setStep(1);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to create course.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container bg-white rounded-3xl p-16 my-10 shadow-md">
                <div className="flex justify-between items-center mb-5">
                    <h3>إضافة كورس - الخطوة {step} من 2</h3>
                    <Link href="/instructor/profile" className="text-xs text-[#FF6F61] flex items-center space-x-5">
                        <svg width="5" height="9" className="mx-1" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.40039 11.4015L6.40039 6.38725L1.40039 1.37305" stroke="#FF6F61" strokeWidth="2.13068" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        رجوع
                    </Link>
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
                                    className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                    placeholder="اسم الكورس"
                                />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="mb-4">
                                    <Label className="block text-sm font-medium text-gray-700">سعر الكورس</Label>
                                    <Input
                                        type="number"
                                        id="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                </div>

                                <div className="mb-4">
                                    <Label className="block text-sm font-medium text-gray-700">مدة الحصة</Label>
                                    <Input
                                        type="text"
                                        id="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">محتوى الكورس</Label>
                                <textarea
                                    id="description_ar"
                                    value={formData.description_ar}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </div>

                            <div className="mb-4 he">
                                <Label className="block text-sm font-medium text-gray-700">feature_1</Label>
                                <Input
                                    type="text"
                                    id="feature_ar_1"
                                    value={formData.feature_ar}
                                    onChange={handleChange}
                                    className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </div>
<div className="mb-4">
                                <Label>ميزات الكورس</Label>
                                <div className="flex flex-wrap mt-1">
                                    {features.map((feature, index) => (
                                        <Badge key={index} variant="secondary" className="m-1">
                                            {feature}
                                            <button type="button" onClick={() => removeFeature(index)} className="ml-2">×</button>
                                        </Badge>
                                    ))}
                                </div>
                                <Input
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyDown={handleFeatureKeyDown}
                                    placeholder="أضف ميزة جديدة واضغط Enter"
                                    className="mt-2"
                                />
                            </div>
                            {/* <div className="flex flex-row flex-nowrap items-center border-none rounded-full mt-1 w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                                {tags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-200 text-sm flex items-center p-1 mr-2 mb-2 rounded"
                                    >
                                        {formData.feature_ar[index] = tag}
                                        <button
                                            className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center"
                                            onClick={() => removeTag(index)}
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
                                    placeholder="اضف ميزة جديد"
                                    className="border-none rounded-full mt-1 block w-full bg-gray-100 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div> */}
                        </>
                    )}

                    {step === 2 && (
                        <>

                            {/* Course Result Description */}
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">course_result_desc</Label>
                                <textarea
                                    id="course_result_desc_ar"
                                    value={formData.course_result_desc_ar}
                                    onChange={handleChange}
                                    className="border-none rounded-2xl mt-1 block w-full bg-gray-100"
                                />
                            </div>


                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">introduction_video</Label>
                                <textarea
                                    id="introduction_video"
                                    value={formData.introduction_video}
                                    onChange={handleChange}
                                    className="border-none rounded-2xl mt-1 block w-full bg-gray-100"
                                />
                            </div>

<div className="mb-4">
                                <Label>أيام وأوقات الكورس</Label>
                                {formData.course_days.map((day, index) => (
                                    <div key={index} className="flex gap-2 mt-2">
                                        <Input
                                            placeholder="اليوم"
                                            value={day.day}
                                            onChange={(e) => handleCourseDayChange(index, 'day', e.target.value)}
                                        />
                                        <Input
                                            type="time"
                                            value={day.from_time}
                                            onChange={(e) => handleCourseDayChange(index, 'from_time', e.target.value)}
                                        />
                                        <Input
                                            type="time"
                                            value={day.to_time}
                                            onChange={(e) => handleCourseDayChange(index, 'to_time', e.target.value)}
                                        />
                                    </div>
                                ))}
                                <div onClick={addCourseDay} className="mt-2">إضافة يوم</div>
                            </div>
                            {/* Category ID */}
                            {/* <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">category_id</Label>
                                <Input
                                    type="text"
                                    id="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className="border-none rounded-2xl mt-1 block w-full bg-gray-100"
                                />
                            </div> */}

                  
                        </>
                    )}

                    {step === 3 && (
                        <>
                            
                            <div className="mb-5">
                                <Label htmlFor="category_id"> حدد الكورس</Label>
                                 <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="اختر تصنيف" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">توجيهي</SelectItem>
                                        <SelectItem value="2">جامعة</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>




                            {/* Image */}
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">image</Label>
                                <Input
                                    type="file"
                                    id="image"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full text-sm text-gray-500"
                                />
                            </div>

                           
                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">zoom_link</Label>
                                <textarea
                                    id="zoom_link"
                                    value={formData.zoom_link}
                                    onChange={handleChange}
                                    className="border-none rounded-2xl mt-1 block w-full bg-gray-100"
                                />
                            </div>
                        


                            <div className="mb-4">
                                <Label className="block text-sm font-medium text-gray-700">lessons_count</Label>
                                <textarea
                                    id="lessons_count"
                                    value={formData.lessons_count}
                                    onChange={handleChange}
                                    className="border-none rounded-2xl mt-1 block w-full bg-gray-100"
                                />
                            </div>
                        </>
                    )}


                    <h3>إضافة كورس - الخطوة {step} من 2</h3>
                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <div
                                onClick={prevStep}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                السابق
                            </div>
                        )}
                        {step < 3 ? (
                            <div
                                onClick={nextStep}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                التالي
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                {isLoading ? "جاري الإنشاء..." : "إنشاء الكورس"}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
