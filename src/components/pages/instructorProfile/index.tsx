"use client";
import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsProfile"
import Image from "next/image";
import UpdateInformation from "@/components/pages/instructorProfile/UpdateInformation";
import CourseUser from "@/components/pages/instructorProfile/courseUser";
import ImgUser from "@/components/pages/instructorProfile/ImgUser";
import PrivetCourse from "@/components/pages/instructorProfile/privetCourse";
import HouerLib from "@/components/pages/instructorProfile/houerLib";

type CheckoutFormProps = {
    token: string;
};
export default function ProfileInstructor({token }: CheckoutFormProps) {
    const t = useTranslations('HomePage');

    return (
        <>
            <section className="lg:container mb-20">
                <div className="flex flex-col justify-center items-center space-y-10 -mt-20">
                    <ImgUser token={token}  />
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

                            <TabsTrigger value="houerLib">
                                <Image src="/profileIcon/setting.svg" alt='الاعدادات' width="30" height="30" />
                                <span className="mt-3 font-bold">الساعات المكتبية</span>
                            </TabsTrigger>
                            <TabsTrigger value="setting">
                                <Image src="/profileIcon/information.svg" alt='خصوصي' width="30" height="30" />
                                <span className="mt-3 font-bold">معلومات عامة </span>
                            </TabsTrigger>
                        </TabsList>

                        <CourseUser token={token} />
                        <PrivetCourse token={token} />
                        <HouerLib token={token} />
                        <UpdateInformation token={token}  />

                    </Tabs>

                </div>
            </section>

        </>
    );
}
