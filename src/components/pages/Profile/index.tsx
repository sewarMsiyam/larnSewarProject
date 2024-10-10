"use client";
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsProfile"
import Image from "next/image";
import UpdateInformation from "@/components/pages/Profile/UpdateInformation";
import CourseUser from "@/components/pages/Profile/courseUser";
import PrivetCourse from "@/components/pages/Profile/PrivetCourse";
import ImgUser from "@/components/pages/Profile/ImgUser";

type CheckoutFormProps = {
    token: string;
};

export default function ProfileIndex({ token }: CheckoutFormProps) {
    return (
        <>
            <section className="lg:container  mb-20">
                <div className="flex flex-col justify-center items-center space-y-10 -mt-10">
                    <ImgUser token={token}  />

                    <Tabs defaultValue="course" dir="rtl" className='w-full mb-10'>
                        <TabsList className='mb-5'>
                            <TabsTrigger value="course">
                                <Image src="/profileIcon/course.svg" alt='الكورسات' width="30" height="30" />
                                <span className="mt-3 font-bold">الكورسات</span>
                            </TabsTrigger>

                            <TabsTrigger value="privetCourse">
                                <Image src="/profileIcon/information.svg" alt='خصوصي' width="30" height="30" />
                                <span className="mt-3 font-bold">معلم خصوصي</span>
                            </TabsTrigger>

                            <TabsTrigger value="setting">
                                <Image src="/profileIcon/setting.svg" alt='الاعدادات' width="30" height="30" />
                                <span className="mt-3 font-bold">الاعدادات</span>
                            </TabsTrigger>
                        </TabsList>
                         <CourseUser token={token} />
                        <PrivetCourse token={token}  />
                        <UpdateInformation token={token}  />
                    </Tabs>

                </div>
            </section>

        </>
    );
}
