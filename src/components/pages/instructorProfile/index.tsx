"use client";
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsProfile"
import Image from "next/image";
import UpdateInformation from "@/components/pages/instructorProfile/UpdateInformation";
import CourseUser from "@/components/pages/instructorProfile/courseUser";
import ImgUser from "@/components/pages/instructorProfile/ImgUser";
import CreateCourse from "@/components/pages/instructorProfile/CreateCourse";
import { useState, useEffect, useCallback } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { updateProfile, fetchProfileData } from '@/app/api/dataFetch';
import { useSession } from "next-auth/react";



export default function ProfileInstructor() {
    const t = useTranslations('HomePage');

    return (
        <>
            <section className="lg:container mb-20">
                <div className="flex flex-col justify-center items-center space-y-10 -mt-10">


                    <ImgUser />
                    <Tabs defaultValue="course" dir="rtl" className='w-full'>
                        <TabsList className='mb-5'>
                            <TabsTrigger value="course">
                                <Image src="/profileIcon/course.svg" alt='الكورسات' width="30" height="30" />
                                <span className="mt-3 font-bold">كورساتي</span>
                            </TabsTrigger>

                            <TabsTrigger value="privetCourse">
                                <Image src="/profileIcon/information.svg" alt='خصوصي' width="30" height="30" />
                                <span className="mt-3 font-bold"> مواعيد الخصوصي</span>
                            </TabsTrigger>

                            <TabsTrigger value="create_course ">
                                <Image src="/profileIcon/setting.svg" alt='الاعدادات' width="30" height="30" />
                                <span className="mt-3 font-bold">الساعات المكتبية</span>
                            </TabsTrigger>
                            <TabsTrigger value="setting">
                                <Image src="/profileIcon/information.svg" alt='خصوصي' width="30" height="30" />
                                <span className="mt-3 font-bold">معلومات عامة </span>
                            </TabsTrigger>
                        </TabsList>

                        <CourseUser />
                        {/* <PrivetCourse /> */}
                        <UpdateInformation />

                    </Tabs>

                </div>
            </section>

        </>
    );
}
