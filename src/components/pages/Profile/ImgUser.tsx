"use client";
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsProfile"
import Image from "next/image";
import UpdateInformation from "@/components/pages/Profile/UpdateInformation";
import CourseUser from "@/components/pages/Profile/courseUser";
import PrivetCourse from "@/components/pages/Profile/PrivetCourse";
import { useState, useEffect, useCallback  } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { updateProfile, fetchProfileData } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";



export default function ImgUser() {
    const t = useTranslations('HomePage');
    const session = useSession();
    const token = (session?.data?.user as { authToken?: string | null })?.authToken;

    const [formData, setFormData] = useState({
         first_name: '',
        last_name: '',
        photo: '',
    });

     const loadProfileData = useCallback(async () => {
        if (!token) return;

        try {
            const profileData = await fetchProfileData('student/student_details', token);
            if (profileData && profileData.item) {
                setFormData({
                first_name: profileData.item.first_name || '',
                last_name: profileData.item.last_name || '',
                photo: profileData.item.photo || '',
            });
            }
        } catch (error) {
            console.error('Failed to load profile data:', error);
        }
    }, [token]);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    


    return (
        <>               
                    <Avatar>
                        <AvatarImage
                            src={formData.photo || ''}
                            alt="Teacher Image"
                            className="shadow rounded-full"
                        />
                        <AvatarFallback>{formData.first_name.charAt(0)}</AvatarFallback>
                    </Avatar>

        </>
    );
}
