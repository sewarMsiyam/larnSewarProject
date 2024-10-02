"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { fetchProfileData } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";

export default function ImgUser() {
    const t = useTranslations('HomePage');
    const session = useSession();
    const token = (session?.data?.user as { authToken?: string | null })?.authToken;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        image: null as File | null,
    });

    const [tempImage, setTempImage] = useState<string | null>(null);

    const loadProfileData = useCallback(async () => {
        if (!token) return;

        try {
            const profileData = await fetchProfileData('student/student_details', token);
            if (profileData && profileData.item) {
                setFormData({
                    first_name: profileData.item.first_name || '',
                    last_name: profileData.item.last_name || '',
                    image: profileData.item.image || '',
                });
            }
        } catch (error) {
            console.error('Failed to load profile data:', error);
            console.log('فشل في تحميل بيانات الملف الشخصي');
        }
    }, [token]);

    // useEffect(() => {
    //     loadProfileData();
    // }, [loadProfileData]);


    // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0] || null;

    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         image: file,
    //     }));
    //     if (file) {
    //         const imageUrl = URL.createObjectURL(file);
    //         setTempImage(imageUrl);

    //         console.log('sewar imageUrl ' + imageUrl);

    //         const confirmed = window.confirm('هل أنت متأكد من حفظ الصورة؟');
    //         if (confirmed) {
    //             const formData = new FormData();
    //             formData.append('image', imageUrl);
    //             console.log(formData)
    //             try {
    //                 if (!token) {
    //                     throw new Error('No authentication token available');
    //                 }

    //                 console.log('Uploading image...');

    //                 const response = await updateProfileImage('student/update', token, formData);

    //                 console.log('updateProfile بعد:', response);

    //                 if (response && response.status === 200 && response.item && response.item.image) {
    //                     setFormData(prevFormData => ({
    //                         ...prevFormData,
    //                         image: response.item.image,
    //                     }));
    //                     setTempImage(null);
    //                     console.log('تم تحديث الصورة بنجاح');
    //                 } else {
    //                     console.error('Unexpected server response:', response);
    //                     console.log('فشل تحديث الصورة: استجابة غير متوقعة من الخادم');
    //                     setTempImage(null);
    //                 }
    //             } catch (error) {
    //                 console.error('Error updating profile image:', error);
    //                 console.log('حدث خطأ أثناء تحديث الصورة');
    //                 setTempImage(null);
    //             }
    //         } else {
    //             setTempImage(null);
    //         }
    //     }
    // };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const getImageSrc = (): string => {
        if (tempImage) return tempImage;
        if (formData.image) return URL.createObjectURL(formData.image);
        return ''; // Default empty string or you could return a placeholder image URL
    };
    return (
        <>
            <Avatar onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                <AvatarImage
                    src={getImageSrc()}
                    alt="User Image"
                    className="shadow rounded-full cursor-pointer"
                />
                <AvatarFallback>{formData.first_name.charAt(0)}{formData.last_name.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* <input
                type="file"
                id="photo"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
            // style={{ display: 'none' }}
            /> */}
        </>
    );
}