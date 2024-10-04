"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateProfile, fetchProfileData } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";


export default function ImgUser() {
    const t = useTranslations('HomePage');
    const session = useSession();
    const token = (session?.data?.user as { authToken?: string | null })?.authToken;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        image: null as File | null,
    });
    
    const [tempImage, setTempImage] = useState<string | null>(null);

    const loadProfileData = useCallback(async () => {
        if (!token) return;

        try {
            const profileData = await fetchProfileData('instructor/instructor_details', token);
            if (profileData && profileData.item) {
                setFormData({
                       name: profileData.item.name || '',
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


    // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault();
    //     const file = e.target.files?.[0] || null;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         image: file,
    //     }));

    //     const data = {
    //         image: formData.image
    //     };
    //     try {
    //         const response = await updateProfile('instructor/update', token as string, data);
    //         if (response && response.status === 200 && response.item) {

    //             setFormData(prevFormData => ({
    //                 ...prevFormData,
    //                 image: response.item.image || prevFormData.image,
    //             }));

    //         } else {
    //             console.error('Unexpected server response:', response);
    //         }
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //         if (error instanceof Error) {
    //             console.error(`An error occurred while updating the profile: ${error.message}`);
    //         } else {
    //             console.error('An unknown error occurred while updating the profile. Please try again.');
    //         }
    //     }

    // };
    const getImageSrc = (): string => {
        if (tempImage) return tempImage;
        if (formData.image) return URL.createObjectURL(formData.image);
        return ''; // Default empty string or you could return a placeholder image URL
    };
    return (
        <>
            <Avatar>
                <AvatarImage src={getImageSrc()}
                    alt="User Image"
                    className="shadow rounded-full cursor-pointer"
                />
                <AvatarFallback>{formData.name.charAt(0)}{formData.name.charAt(1)}</AvatarFallback>
            </Avatar>
            {/* 
            <Input
                type="file"
                id="image"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500"
            /> */}
        </>
    );
}