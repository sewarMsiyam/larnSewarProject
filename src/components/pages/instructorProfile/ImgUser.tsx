"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreatHeuerFun, fetchProfileData } from '@/app/api/dataFetch';
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import "react-toastify/dist/ReactToastify.css";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type CheckoutFormProps = {
    token: string;
};

export default function ImgUser({ token }: CheckoutFormProps) {
    const t = useTranslations('HomePage');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: null as File | null,
    });

    const loadProfileData = useCallback(async () => {
        if (!token) return;

        try {
            const profileData = await fetchProfileData('instructor/instructor_details', token);
            if (profileData && profileData.item) {
                setFormData(profileData.item);
                setSelectedImage(profileData.item.image || null);
            }
        } catch (error) {
            console.error('Failed to load profile data:', error);
            toast.error('Failed to load profile data');
        }
    }, [token]);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const courseData = new FormData();
        if (formData.image instanceof File) {
            courseData.append('image', formData.image);
        }

        try {
            const result = await CreatHeuerFun("instructor/update", token, courseData);
            console.log("result =" + result)
            if (result.status) {
                toast.success(result.message || "تم تغيير الصورة");
                loadProfileData();
            } else {
                toast.error(result.message || "فشل تغيير الصورة.");
            }
        } catch (error: any) {
            console.error("Error updating image:", error);
            toast.error(error.message || "فشل تحديث الصورة.");
        } finally {
            setIsLoading(false);
        }
    };

    const getImageSource = (): string => {
        if (selectedImage) {
            return selectedImage;
        }
        if (typeof formData.image === 'string') {
            return formData.image;
        }
        return '';
    };
    return (
        <>

            <ToastContainer position="top-right" autoClose={5000} />
            <Dialog>
                <DialogTrigger>
                    <span className='bg-white text-primary size-7 flex items-center justify-center rounded-full absolute z-10 '>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.15693 3.41217L12.9651 8.22059L6.37061 14.8237C6.06413 15.13 5.67053 15.334 5.24366 15.4081L1.28696 16.0676C1.23999 16.0745 1.19252 16.0773 1.14506 16.0759C0.9223 16.0734 0.709419 15.9835 0.552372 15.8254C0.457339 15.7305 0.385934 15.6145 0.343888 15.4869C0.301842 15.3593 0.290349 15.2238 0.310313 15.0909L0.969747 11.134C1.04394 10.7072 1.248 10.3135 1.55408 10.007L8.15693 3.41217ZM15.1605 1.21656C14.8457 0.899138 14.4712 0.647244 14.0586 0.475309C13.646 0.303375 13.2034 0.214844 12.7564 0.214844C12.3094 0.214844 11.8668 0.303375 11.4542 0.475309C11.0416 0.647244 10.6671 0.899138 10.3523 1.21656L9.34231 2.22662L14.1505 7.03504L15.1605 6.02498C15.4779 5.7102 15.7298 5.33563 15.9018 4.92299C16.0737 4.51035 16.1622 4.0679 16.1622 3.62087C16.1622 3.17384 16.0737 2.73118 15.9018 2.31854C15.7298 1.9059 15.4779 1.53133 15.1605 1.21656Z" fill="currentColor" fillOpacity="0.4" />
                        </svg>
                    </span>
                    <Avatar>
                        <AvatarImage src={getImageSource()} alt="User Image"
                            className="shadow rounded-full cursor-pointer"
                        />
                        <AvatarFallback>{formData.name.charAt(0)}{formData.name.charAt(1)}</AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='my-3'>تحديث صورة الملف الشخصي</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Label htmlFor="image" className="block text-sm font-medium text-gray-700">صورة الغلاف</Label>
                                    <Input
                                        type="file"
                                        id="image"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        ref={fileInputRef}
                                        accept="image/*"
                                    />
                                    <div className="bg-gray-100 flex flex-col mt-2 justify-center items-center rounded-xl p-8 cursor-pointer" onClick={handleImageClick} >
                                        <img src="/camera.svg" alt="" width="20" />
                                        <h2>أرفع الصورة هنا</h2>
                                        {selectedImage && (
                                            <img src={selectedImage} alt="Selected" className="mt-4" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                        )}
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="before:ease relative overflow-hidden btn-primary text-white rounded-2xl font-medium py-2.5 px-6 md:px-3 lg:px-6 m-1 transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
                                >
                                    {isLoading ? "جاري الحفظ..." : "حفظ الصورة"}
                                </Button>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}





