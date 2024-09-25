import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatarlg"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabsProfile"
import Image from "next/image";
import UpdateInformation from "@/components/pages/Profile/UpdateInformation";
import CourseUser from "@/components/pages/Profile/courseUser";
import PrivetCourse from "@/components/pages/Profile/PrivetCourse";

export default function ProfileIndex() {
    const t = useTranslations('HomePage');
    return (
        <>
            <section className="container">
                <div className="flex flex-col justify-center items-center space-y-10 -mt-10">                
                    <Avatar>
                        <AvatarImage
                            src=''
                            alt="Teacher Image"
                            className="shadow rounded-full"
                        />
                        <AvatarFallback>sewar</AvatarFallback>
                    </Avatar>


                    <Tabs defaultValue="course" dir="rtl" className='w-full'>
                        <TabsList className='mb-5'>
                            <TabsTrigger value="course">
                                <Image src="/profileIcon/course.svg" alt='الكورسات' width="50" height="50" />
                                <span className="mt-3 font-bold">الكورسات</span>
                            </TabsTrigger>

                            <TabsTrigger value="privetCourse">
                                <Image src="/profileIcon/information.svg" alt='خصوصي' width="50" height="50" />
                                <span className="mt-3 font-bold">معلم خصوصي</span>
                            </TabsTrigger>

                            <TabsTrigger value="setting">
                                <Image src="/profileIcon/setting.svg" alt='الاعدادات' width="50" height="50" />
                                <span className="mt-3 font-bold">الاعدادات</span>
                            </TabsTrigger>
                        </TabsList>

                       
                        <CourseUser />
                        <PrivetCourse />
                        <UpdateInformation />
                    </Tabs>

                </div>
            </section>

        </>
    );
}
