"use client";
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsProfile"
import Image from "next/image";
import UpdateInformation from "@/components/pages/instructorProfile/UpdateInformation";
import CourseUser from "@/components/pages/instructorProfile/courseUser";
import ImgUser from "@/components/pages/instructorProfile/ImgUser";
import CreateCourse from "@/components/pages/instructorProfile/CreateCourse";
import { useState, useEffect, useCallback  } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { updateProfile, fetchProfileData } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";



export default function ProfileInstructor() {
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

    
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {  
        first_name: formData.first_name, 
        last_name: formData.last_name, 
        photo: formData.photo 
    };
    try {
        const response = await updateProfile('instructor/update', token as string , data);
        if (response && response.status === 200 && response.item) {
            console.log('Profile updated successfully:', response);
 
            setFormData(prevFormData => ({
                ...prevFormData,
                photo: response.item.photo || prevFormData.photo,
            }));
            alert('Profile updated successfully');
        } else {
            console.error('Unexpected server response:', response);
            alert(`Failed to update profile. Server response: ${JSON.stringify(response)}`);
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        if (error instanceof Error) {
            alert(`An error occurred while updating the profile: ${error.message}`);
        } else {
            alert('An unknown error occurred while updating the profile. Please try again.');
        }
    }
};


    return (
        <>
            <section className="lg:container mb-20">
                <div className="flex flex-col justify-center items-center space-y-10 -mt-10">                
                    {/* <Avatar>
                        <AvatarImage
                            src={formData.photo || ''}
                            alt="Teacher Image"
                            className="shadow rounded-full"
                        />
                        <AvatarFallback>{formData.first_name.charAt(0)}</AvatarFallback>
                    </Avatar> */}
                    <ImgUser />



                    
                    <Tabs defaultValue="course" dir="rtl" className='w-full'>
                        <TabsList className='mb-5'>
                            <TabsTrigger value="course">
                                <Image src="/profileIcon/course.svg" alt='الكورسات' width="30" height="30" />
                                <span className="mt-3 font-bold">الكورسات</span>
                            </TabsTrigger>

                            <TabsTrigger value="privetCourse">
                                <Image src="/profileIcon/information.svg" alt='خصوصي' width="30" height="30" />
                                <span className="mt-3 font-bold"> خصوصي</span>
                            </TabsTrigger>

                            <TabsTrigger value="setting">
                                <Image src="/profileIcon/setting.svg" alt='الاعدادات' width="30" height="30" />
                                <span className="mt-3 font-bold">الاعدادات</span>
                            </TabsTrigger>
                            <TabsTrigger value="create_course">
                                <Image src="/profileIcon/information.svg" alt='خصوصي' width="30" height="30" />
                                <span className="mt-3 font-bold">اضافة كورس</span>
                            </TabsTrigger>
                        </TabsList>
                       
                        <CourseUser />
                        {/* <PrivetCourse /> */}
                        <UpdateInformation />
                        <CreateCourse />

                    </Tabs>

                </div>
            </section>

        </>
    );
}
