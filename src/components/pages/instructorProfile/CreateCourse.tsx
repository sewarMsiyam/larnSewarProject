"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { TabsContent } from "@/components/ui/tabsProfile";
import { CreateCourseFun } from "@/app/api/dataFetch";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function CreateCourse() {
    const t = useTranslations("HomePage");
    const { data: session } = useSession();
    const token = (session?.user as { authToken?: string | null })?.authToken;

    // Form state
    const [formData, setFormData] = useState({
        name_ar: "",
        description_ar: "",
        course_result_desc_ar: "",
        duration: "",
        introduction_video: "",
        price: "",
        has_certificate: false,
        status: "active",
        category_id: "",
        feature_ar_1: "",
        image: null as File | null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { id, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: file,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !formData.name_ar ||
            !formData.description_ar ||
            !formData.duration ||
            !formData.price ||
            !formData.category_id ||
            !formData.feature_ar_1 ||
            !formData.image
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const courseData = new FormData();
        courseData.append("name_ar", formData.name_ar);
        courseData.append("description_ar", formData.description_ar);
        courseData.append("course_result_desc_ar", formData.course_result_desc_ar);
        courseData.append("duration", formData.duration);
        courseData.append("introduction_video", formData.introduction_video);
        courseData.append("price", formData.price);
        courseData.append("has_certificate", formData.has_certificate.toString());
        courseData.append("status", formData.status);
        courseData.append("category_id", formData.category_id);
        courseData.append("feature_ar[0]", formData.feature_ar_1);
        courseData.append("image", formData.image!);

        setIsLoading(true);
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
                    has_certificate: false,
                    status: "active",
                    category_id: "",
                    feature_ar_1: "",
                    image: null,
                });
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
            <TabsContent value="create_course" className="bg-white rounded-lg p-5 shadow-md">
                <form onSubmit={handleSubmit}>
                    {/* Arabic Name */}
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">name</Label>
                        <Input
                            type="text"
                            id="name_ar"
                            value={formData.name_ar}
                            onChange={handleChange}
                            className="border-none rounded-full mt-1 block w-full bg-gray-100"
                            placeholder="name"
                        />
                    </div>

                    {/* Arabic Description */}
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">description</Label>
                        <textarea
                            id="description_ar"
                            value={formData.description_ar}
                            onChange={handleChange}
                            className="border-none rounded-full mt-1 block w-full bg-gray-100"
                        />
                    </div>

                    {/* Course Result Description */}
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">course_result_desc</Label>
                        <textarea
                            id="course_result_desc_ar"
                            value={formData.course_result_desc_ar}
                            onChange={handleChange}
                            className="border-none rounded-full mt-1 block w-full bg-gray-100"
                        />
                    </div>


                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">introduction_video</Label>
                        <textarea
                            id="introduction_video"
                            value={formData.introduction_video}
                            onChange={handleChange}
                            className="border-none rounded-full mt-1 block w-full bg-gray-100"
                        />
                    </div>

                    {/* Duration */}
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">duration</Label>
                        <Input
                            type="text"
                            id="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="border-none rounded-full mt-1 block w-full bg-gray-100"
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">price</Label>
                        <Input
                            type="number"
                            id="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="border-none rounded-full mt-1 block w-full bg-gray-100"
                        />
                    </div>

                    {/* Category ID */}
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">category_id</Label>
                        <Input
                            type="text"
                            id="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="border-none rounded-full mt-1 block w-full bg-gray-100"
                        />
                    </div>

                    {/* Feature 1 */}
                    <div className="mb-4">
                        <Label className="block text-sm font-medium text-gray-700">feature_1</Label>
                        <Input
                            type="text"
                            id="feature_ar_1"
                            value={formData.feature_ar_1}
                            onChange={handleChange}
                            className="border-none rounded-full mt-1 block w-full bg-gray-100"
                        />
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        {isLoading ? "creating" : "create_course"}
                    </button>
                </form>
            </TabsContent>
        </>
    );
}










