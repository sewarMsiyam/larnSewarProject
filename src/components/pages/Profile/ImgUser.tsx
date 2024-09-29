"use client";
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { updateProfile, fetchProfileData } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";

export default function ImgUser() {
    const t = useTranslations('HomePage');
    const session = useSession();
    const token = (session?.data?.user as { authToken?: string | null })?.authToken;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_code: '',
        image: '',
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
                    email: profileData.item.email || '',
                    phone: profileData.item.phone || '',
                    phone_code: profileData.item.phone_code || '',
                    image: profileData.item.image || '',
                });
            }
        } catch (error) {
            console.error('Failed to load profile data:', error);
            console.log('فشل في تحميل بيانات الملف الشخصي');
        }
    }, [token]);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setTempImage(imageUrl);

            console.log('sewar imageUrl ' + imageUrl);

            setTimeout(() => {
                const confirmed = window.confirm('هل أنت متأكد من حفظ الصورة؟');
                if (confirmed) {
                    console.log('sewar file' + file);
                    uploadImage(file);
                } else {
                    setTempImage(null);
                }
            }, 100);
        }
    };

    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            if (!token) {
                throw new Error('No authentication token available');
            }

            console.log('Uploading image...');

            const response = await updateProfile('student/update', token, formData);

            console.log('Server response:', response);

            if (response && response.status === 200 && response.item && response.item.image) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    image: response.item.image,
                }));
                setTempImage(null);
                console.log('تم تحديث الصورة بنجاح');
            } else {
                console.error('Unexpected server response:', response);
                console.log('فشل تحديث الصورة: استجابة غير متوقعة من الخادم');
                setTempImage(null);
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
            console.log('حدث خطأ أثناء تحديث الصورة');
            setTempImage(null);
        }
    };

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <Avatar onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                <AvatarImage
                    src={tempImage || formData.image || ''}
                    alt="User Image"
                    className="shadow rounded-full cursor-pointer"
                />
                <AvatarFallback>{formData.first_name.charAt(0)}</AvatarFallback>
            </Avatar>

            <input
                type="file"
                id="photo"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
            // style={{ display: 'none' }}
            />
        </>
    );
}